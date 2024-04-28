import Matter from 'matter-js'
const { Engine } = Matter

import { RenderProxy } from './core/render'
import { ISettings } from './types/settings'
import { Settings } from './settings'
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

let engine: Matter.Engine
let world: Matter.World
let element: HTMLElement

let renderProxy: RenderProxy
let gameSettings: ISettings

let field: Field
let play: Play
let oppeningPosition: Position

/*

import {
  IManipulationOptions,
  PlayOptions,
  getBallById,
  getPegById,
  getSlotById,
  isPegCollision,
  isSlotCollision,
} from './process/play'

import { Play } from './process/play'
import { Inputs } from './ui/inputs'
import { Controls } from './ui/controls'
import { Store, createStore } from './store'



//let render: Matter.Render
let inputs: Inputs
let controls: Controls

let store: Store

function setupEngine() {
  engine.timing.timeScale = inputs.timeScale
}

function saveSettings() {
  store.saveSettings(controls.level, inputs.settings)
  //console.log('saveSettings')
}

function exportSettings() {
  //console.log('exportSettings')
  console.log(store.toJSON())
  store.export()
}

function changeLevel() {
  inputs.setSettings(store.getSettings(controls.level))
  rebuild()
}
*/

function setupRender() {
  renderProxy.initRunner(engine, 1000 / 60)
}

function setupWorld() {
  engine.gravity.scale = gameSettings.gravityScale
  engine.gravity.x = gameSettings.gravityX
  engine.gravity.y = gameSettings.gravityY
}

function rebuild() {
  resizeElement(renderProxy.render, 375, 310)
  rebuildField(8, world)
}

function rebuildField(newLevels: number, world: Matter.World) {
  Matter.Composite.clear(world, true, true)

  field = new Field(world)
  field.init({
    levels: newLevels,
    gap: gameSettings.gap,
    pegRadius: gameSettings.pegRadius,
    pegFriction: gameSettings.pegFriction,
    pegRestitution: gameSettings.pegRestitution,
    spacing: gameSettings.spacing,
  })

  Matter.Bodies.circle(100, 100, 500, {
    isStatic: true,
    render: {
      fillStyle: '#FF0000',
    },
  })

  console.log('rebuildField')
  console.log(field)

  const dx = (375 - field.width) / 2
  const dy = (310 - field.height) / 2
  Matter.Composite.translate(field.container, { x: dx, y: dy })

  oppeningPosition = new Position(dx, dy)
  oppeningPosition.x += field.oppeningPosition.x
}

function run() {
  //console.log('running')
  gameSettings = new Settings({
    timeScale: 1,
    gravityScale: 0.001,
    gravityX: 0,
    gravityY: 1,
    gap: 19,
    spacing: 43,
    pegRadius: 3,
    pegFriction: 0.0,
    pegRestitution: 0.3,
    ballRadius: 10,
    ballFriction: 0.0,
    ballFrictionAir: 0.01,
    ballSlop: 0.0,
    ballRestitution: 0.5,
    ballDensity: 0.03,
    forceMagnitude: 0.04,
    velocity: 0.03,
    angularVelocity: 0.03,
  })

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

  const playBtn = document.getElementById('playBtn')
  playBtn?.addEventListener('click', newPlay)

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
          velocityCof: gameSettings.velocity,
          angularVelocityCof: gameSettings.angularVelocity,
          forceMagnitude: gameSettings.forceMagnitude,
        } satisfies IManipulationOptions

        play.applyForce(options)
        //}
      }
    })
  })
}
run()

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
    ballRadius: gameSettings.ballRadius,
    friction: gameSettings.ballFriction,
    restitution: gameSettings.ballRestitution,
    density: gameSettings.ballDensity,
    path,
  } satisfies PlayOptions

  play.playOne(options)
}
