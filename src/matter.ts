import Matter from 'matter-js'
import { resize } from './utilities/resize'
import { createRender } from './core/render'
import { Field } from './components/field'
import { Position } from './utilities/position'
import { PlayOptions } from './process/play'

import { startPlay } from './process/play'

const { Composite, Engine } = Matter

let levels: number
let field: Field
let engine: Matter.Engine
let world: Matter.World
let render: Matter.Render
let element: HTMLElement
let oppeningPosition: Position

function rebuild() {
  resize(render, element)
  rebuildField(8, world)
}

function rebuildField(newLevels: number, world: Matter.World) {
  levels = newLevels

  Composite.clear(world, true, true)

  field = new Field(world)
  field.init({
    levels,
    gap: 50,
    pegRadius: 10,
    spacing: 90,
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

function run() {
  engine = Engine.create()
  world = engine.world
  element = document.querySelector('body') as HTMLBodyElement
  render = createRender(engine, element)

  window.addEventListener('resize', rebuild)
  window.addEventListener('load', rebuild)

  window.addEventListener('keydown', async (e) => {
    if (e.code === 'Space') {
      play()
    }
  })
}

function play() {
  const options = {
    world,
    oppeningPosition,
    ballRadius: 25,
  } satisfies PlayOptions
  //
  startPlay(options)
}

run()
