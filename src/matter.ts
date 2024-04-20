import Matter from 'matter-js'
import { resize } from './utilities/resize'
import { RenderProxy } from './core/render'
import { Field } from './components/field'
import { Position } from './utilities/position'
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

const { Composite, Engine } = Matter

let play: Play
let field: Field
let engine: Matter.Engine
let world: Matter.World
let renderProxy: RenderProxy
//let render: Matter.Render
let element: HTMLElement
let oppeningPosition: Position
let inputs: Inputs
let controls: Controls

let store: Store

function rebuild() {
  inputs.setSettings(store.getSettings(controls.level))
  resize(renderProxy.render, element)
  rebuildField(controls.level, world)
}

function rebuildField(newLevels: number, world: Matter.World) {
  Composite.clear(world, true, true)

  field = new Field(world)
  field.init({
    levels: newLevels,
    gap: inputs.gap,
    pegRadius: inputs.pegRadius,
    pegFriction: inputs.pegFriction,
    pegRestitution: inputs.pegRestitution,
    spacing: inputs.spacing,
  })

  const dx = (element.clientWidth - field.width) / 2
  const dy = (element.clientHeight - field.height) / 2
  Composite.translate(field.container, { x: dx, y: dy })

  oppeningPosition = new Position(dx, dy)
  oppeningPosition.x += field.oppeningPosition.x

  //slots = credentials.slots
  //pegs = credentials.pegs
  //container = credentials.container
  //openning = credentials.openning
  //fraction = credentials.fraction

  //centerContainer(app, field.container)
  //field.container.visible = true
}

function setupWorld() {
  engine.gravity.scale = inputs.gravityScale
  engine.gravity.x = inputs.gravityX
  engine.gravity.y = inputs.gravityY
}

function setupRender() {
  //const delta = inputs.speedDelta
  renderProxy.initRunner(engine, 1000 / 60)
}

function setupEngine() {
  engine.timing.timeScale = inputs.timeScale
}

function saveSettings() {
  store.saveSettings(controls.level, inputs.settings)
  //console.log('saveSettings')
}

function run() {
  engine = Engine.create()
  world = engine.world
  element = document.querySelector('body') as HTMLBodyElement

  inputs = new Inputs()
  inputs.dispatcher.addListener('rebuild', rebuild)
  inputs.dispatcher.addListener('world', setupWorld)
  inputs.dispatcher.addListener('engine', setupEngine)

  store = createStore()
  //inputs.setSettings(store.getSettings(controls.level))

  renderProxy = new RenderProxy({ engine, element })
  renderProxy.run()

  setupRender()
  setupWorld()

  controls = new Controls()
  controls.dispatcher.addListener('changeLevel', rebuild)
  controls.dispatcher.addListener('play', newPlay)
  controls.dispatcher.addListener('save', saveSettings)

  play = new Play(world)

  window.addEventListener('resize', rebuild)
  window.addEventListener('load', rebuild)

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
        /* works but need animation */
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

        const distance = peg.position.y - ball.position.y
        const radiuses = inputs.ballRadius + inputs.pegRadius

        //console.log(distance, radiuses)
        if (distance > radiuses * 0.9) {
          const options = {
            id: ball.id,
            level,
            velocityCof: inputs.velocity,
            angularVelocityCof: inputs.angularVelocity,
            forceMagnitude: inputs.forceMagnitude,
          } satisfies IManipulationOptions

          play.applyForce(options)
        }
      }
    })
  })
}

function pegAnimation(body: Matter.Body) {
  //console.log('pegAnimation')
  //console.log(body)
  body.render.fillStyle = '#F101C4'
  setTimeout(() => {
    body.render.fillStyle = '#F6B23D'
  }, 100)
}

function slotAnimation(body: Matter.Body) {
  console.log('slotAnimation')
  Matter.Body.translate(body, { x: 0, y: 10 })
  setTimeout(() => {
    Matter.Body.translate(body, { x: 0, y: -10 })
  }, 50)
}

function newPlay() {
  const path: boolean[] = Array.from(
    Array(controls.level),
    () => Math.random() < 0.5,
  )
  console.log(path)

  const options = {
    oppeningPosition,
    ballRadius: inputs.ballRadius,
    friction: inputs.ballFriction,
    restitution: inputs.ballRestitution,
    density: inputs.ballDensity,
    path,
  } satisfies PlayOptions

  play.playOne(options)
}

run()
