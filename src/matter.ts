import Matter from 'matter-js'
import { resize } from './utilities/resize'
import { RenderProxy } from './core/render'
import { Field } from './components/field'
import { Position } from './utilities/position'
import { PlayOptions, getBallId, isSlotCollision } from './process/play'

import { Play } from './process/play'
import { Inputs } from './ui/inputs'
import { Controls } from './ui/controls'

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

function rebuild() {
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
  // console.log('setupWorld')
  // console.log('gravityScale:' + inputs.gravityScale)
  // console.log('gravityX:' + inputs.gravityX)
  // console.log('gravityY:' + inputs.gravityY)
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

function run() {
  engine = Engine.create()
  world = engine.world
  element = document.querySelector('body') as HTMLBodyElement

  inputs = new Inputs()
  inputs.dispatcher.addListener('rebuild', rebuild)
  inputs.dispatcher.addListener('world', setupWorld)
  inputs.dispatcher.addListener('engine', setupEngine)

  renderProxy = new RenderProxy({ engine, element })
  renderProxy.run()

  setupRender()
  setupWorld()

  controls = new Controls()
  controls.dispatcher.addListener('changeLevel', rebuild)
  controls.dispatcher.addListener('play', newPlay)

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
      if (isSlotCollision(collision)) {
        /* works but need animation */
        const ballId = getBallId(collision)
        play.removeById(ballId)
      }
    })
  })
}

function newPlay() {
  const options = {
    oppeningPosition,
    ballRadius: inputs.ballRadius,
    friction: inputs.ballFriction,
    restitution: inputs.ballRestitution,
    density: inputs.ballDensity,
  } satisfies PlayOptions

  play.playOne(options)
}

run()
