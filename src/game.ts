import Matter from 'matter-js'
const { Engine } = Matter

import { RenderProxy } from './core/render'
import { ISettings, CanvasMode } from './types/settings'
//import { Settings } from './settings'
import { Position } from './utilities/position'

import { resizeElement } from './utilities/resize'
import { Field } from './components/field'
import {
  Play,
  PlayOptions,
  isSlotCollision,
  getBallById,
  getPegById,
  getSlotById,
  isPegCollision,
  IManipulationOptions,
} from './process/play'
import { GameControls } from './ui/controls.game'
import { Store } from './store/game.store'
import { GameLocale } from './locale/locale.game'

let engine: Matter.Engine
let world: Matter.World
let element: HTMLElement

let renderProxy: RenderProxy
let gameSettings: ISettings | null | undefined

let field: Field
let play: Play
let oppeningPosition: Position

//let levelBtns: NodeListOf<Element>

let controls: GameControls
let store: Store

let locale: GameLocale

let canvasMode: CanvasMode

function changeLevel() {
  //inputs.setSettings(store.getSettings(controls.level))
  //console.log(controls.level)
  gameSettings = store.getSettings(canvasMode, controls.level)
  rebuild()
}

function setupRender() {
  renderProxy.initRunner(engine, 1000 / 60)
}

function setupWorld() {
  engine.gravity.scale = gameSettings?.gravityScale || 0.001
  engine.gravity.x = gameSettings?.gravityX || 0
  engine.gravity.y = gameSettings?.gravityY || 1
}

interface ISize {
  width: number
  height: number
}

function rebuild() {
  const canvasSize: ISize =
    canvasMode === CanvasMode.XS
      ? { width: 375, height: 310 }
      : { width: 450, height: 472 }
  //console.log(canvasSize)

  resizeElement(renderProxy.render, canvasSize.width, canvasSize.height)
  rebuildField(controls.level, world, canvasSize)
}

function rebuildField(
  newLevels: number,
  world: Matter.World,
  canvasSize: ISize,
) {
  Matter.Composite.clear(world, true, true)

  console.log('spacing: ', gameSettings?.spacing)

  field = new Field(world)
  field.init({
    levels: newLevels,
    gap: gameSettings?.gap || 19,
    pegRadius: gameSettings?.pegRadius || 3,
    pegFriction: gameSettings?.pegFriction || 0.0,
    pegRestitution: gameSettings?.pegRestitution || 0.3,
    spacing: gameSettings?.spacing || 43,
    oppeningScale: gameSettings?.oppeningScale || 1.0,
  })

  Matter.Bodies.circle(100, 100, 500, {
    isStatic: true,
    render: {
      fillStyle: '#FF0000',
    },
  })

  const dx = (canvasSize.width - field.width) / 2
  const dy = (canvasSize.height - field.height) / 2
  Matter.Composite.translate(field.container, { x: dx, y: dy })

  oppeningPosition = new Position(dx, dy)
  oppeningPosition.x += field.oppeningPosition.x
  oppeningPosition.y += 5
}

function changeSpeed() {
  if (gameSettings) {
    gameSettings.timeScale = controls?.speed || 1
  }
  engine.timing.timeScale = gameSettings?.timeScale || 1
}

function resize() {
  //
  const screenWidth = Math.max(
    window.innerWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth,
  )

  //console.log('screenWidth: ' + screenWidth)

  const newMode = screenWidth < 640 ? CanvasMode.XS : CanvasMode.LG
  // if (screenWidth < 375) {
  //   newMode = CanvasMode.XS
  // } else if (screenWidth >= 375 && screenWidth < 640) {
  //   //canvasMode = CanvasMode.SM
  //   newMode = CanvasMode.XS
  // } else if (screenWidth >= 640 && screenWidth < 768) {
  //   newMode = CanvasMode.LG
  //   //canvasMode = CanvasMode.SM
  // } else if (screenWidth >= 768 && screenWidth < 1024) {
  //   newMode = CanvasMode.LG
  //   //canvasMode = CanvasMode.MD
  // } else if (screenWidth >= 1024 && screenWidth < 1280) {
  //   newMode = CanvasMode.LG
  // } else if (screenWidth >= 1280 && screenWidth < 1536) {
  //   newMode = CanvasMode.LG
  // } else {
  //   newMode = CanvasMode.LG
  // }

  if (newMode !== canvasMode) {
    canvasMode = newMode
    console.log('new canvas mode: ' + canvasMode)
    changeLevel()
  }
}

async function run() {
  //console.log('running')
  controls = new GameControls()
  controls.dispatcher.addListener('play', newPlay)
  controls.dispatcher.addListener('changeLevel', changeLevel)
  controls.dispatcher.addListener('changeSpeed', changeSpeed)

  store = new Store()
  await store.initSettings('./game.config.json')
  gameSettings = store.getSettings(CanvasMode.XS, controls.level)

  engine = Engine.create()
  world = engine.world
  element = document.getElementById('canvasBody') as HTMLElement

  renderProxy = new RenderProxy({ engine, element })
  renderProxy.run()

  setupRender()
  setupWorld()

  play = new Play(world)

  locale = new GameLocale()
  locale.setLanguage(store.language)

  window.addEventListener('resize', resize)
  window.addEventListener('load', resize)

  window.addEventListener('keydown', async (e) => {
    if (e.code === 'Space') {
      newPlay()
    }
  })

  Matter.Events.on(engine, 'collisionStart', (event) => {
    //console.log(event)
    event.pairs.forEach((collision) => {
      //
      if (isSlotCollision(collision)) {
        // works but need animation
        const ball = getBallById(collision)
        play.removeById(ball.id)

        const slot = getSlotById(collision)
        slotAnimation(slot)
      }
      //
      if (isPegCollision(collision)) {
        const peg = getPegById(collision)
        pegAnimation(peg)
        // should be path logic there: !!!
        const level = field.getPegLine(peg.id)
        //console.log(pegLine)

        const ball = getBallById(collision)

        //const distance = peg.position.y - ball.position.y
        //const radiuses = gameSettings.ballRadius + gameSettings.pegRadius

        //console.log(distance, radiuses)
        //if (distance > radiuses) {
        const options = {
          id: ball.id,
          level,
          velocity: gameSettings?.velocity || 0.03,
          angularVelocity: gameSettings?.angularVelocity || 0.03,
          forceMagnitude: gameSettings?.forceMagnitude || 0.04,
        } satisfies IManipulationOptions

        play.applyForce(options)
        //}
      }
    })
  })
}
await run()

function pegAnimation(body: Matter.Body) {
  //console.log('pegAnimation')
  //console.log(body)

  const blinkSprite = field.getPegBlinkSprite()
  const sprite = field.getPegSprite()

  //console.log(sprite)
  //console.log(blinkSprite)

  if (body.render.sprite) {
    body.render.sprite.texture = blinkSprite?.texture || 'default'
  }

  setTimeout(() => {
    if (body.render.sprite) {
      body.render.sprite.texture = sprite?.texture || 'default'
    }
  }, 100)
}

function slotAnimation(body: Matter.Body) {
  //console.log('slotAnimation')
  //console.log(body)
  Matter.Body.translate(body, { x: 0, y: 10 })
  setTimeout(() => {
    Matter.Body.translate(body, { x: 0, y: -10 })
  }, 50)
}

function newPlay() {
  const path: boolean[] = Array.from(Array(8), () => Math.random() < 0.5)
  console.log(path)

  const options = {
    oppeningPosition,
    ballRadius: gameSettings?.ballRadius || 10,
    friction: gameSettings?.ballFriction || 0.01,
    restitution: gameSettings?.ballRestitution || 0.5,
    density: gameSettings?.ballDensity || 0.03,
    path,
  } satisfies PlayOptions

  play.playOne(options)
}
