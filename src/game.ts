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

function changeLevel() {
  //inputs.setSettings(store.getSettings(controls.level))
  //console.log(controls.level)
  gameSettings = store.getSettings(CanvasMode.XS, controls.level)
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

function rebuild() {
  resizeElement(renderProxy.render, 375, 310)
  rebuildField(controls.level, world)
}

function rebuildField(newLevels: number, world: Matter.World) {
  Matter.Composite.clear(world, true, true)

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

  const dx = (375 - field.width) / 2
  const dy = (310 - field.height) / 2
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

async function run() {
  //console.log('running')
  controls = new GameControls()
  controls.dispatcher.addListener('play', newPlay)
  controls.dispatcher.addListener('changeLevel', changeLevel)
  controls.dispatcher.addListener('changeSpeed', changeSpeed)

  store = new Store()
  await store.initSettings('./game.config.json')
  gameSettings = store.getSettings(CanvasMode.XS, controls.level)

  // gameSettings = new Settings({
  //   timeScale: 1,
  //   gravityScale: 0.001,
  //   gravityX: 0,
  //   gravityY: 1,
  //   gap: 19,
  //   spacing: 43,
  //   pegRadius: 3,
  //   pegFriction: 0.0,
  //   pegRestitution: 0.3,
  //   ballRadius: 10,
  //   ballFriction: 0.0,
  //   ballFrictionAir: 0.01,
  //   ballSlop: 0.0,
  //   ballRestitution: 0.5,
  //   ballDensity: 0.03,
  //   forceMagnitude: 0.04,
  //   velocity: 0.03,
  //   angularVelocity: 0.03,
  // })

  engine = Engine.create()
  world = engine.world
  element = document.getElementById('canvasBody') as HTMLElement

  //inputs = new Inputs()
  //inputs.dispatcher.addListener('rebuild', rebuild)
  //inputs.dispatcher.addListener('world', setupWorld)
  //inputs.dispatcher.addListener('engine', setupEngine)

  //store = createStore()

  renderProxy = new RenderProxy({ engine, element })
  renderProxy.run()

  setupRender()
  setupWorld()

  //controls = new Controls()
  //controls.dispatcher.addListener('changeLevel', changeLevel)
  //controls.dispatcher.addListener('play', newPlay)
  //controls.dispatcher.addListener('save', saveSettings)
  //controls.dispatcher.addListener('export', exportSettings)

  //inputs.setSettings(store.getSettings(controls.level))

  play = new Play(world)

  window.addEventListener('resize', rebuild)
  window.addEventListener('load', rebuild)

  //const playBtn = document.getElementById('playBtn')
  //playBtn?.addEventListener('click', newPlay)

  window.addEventListener('keydown', async (e) => {
    if (e.code === 'Space') {
      newPlay()
    }
  })

  /*
  levelBtns = document.querySelectorAll('button[data-level]')
  levelBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      removeAccent()
      btn.classList.remove('functional-btn')
      btn.classList.add('functional-btn-selected')
      //if (btn instanceof HTMLElement) {
      //this._level = +(btn.dataset.level || 8)
      //this.dispatcher.emit('changeLevel', {})
      //}
    })
  })
  */

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
        //pegAnimation(peg)
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

//function pegAnimation(body: Matter.Body) {
//console.log('pegAnimation')
//console.log(body)
//body.render.fillStyle = '#F101C4'
//setTimeout(() => {
//  body.render.fillStyle = '#F6B23D'
//}, 100)
//}

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
