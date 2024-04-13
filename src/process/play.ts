import Matter, { IBodyDefinition } from 'matter-js'
import { Ball } from '../components/ball'
import { Position } from '../utilities/position'
const { Composite } = Matter

export interface PlayOptions {
  world: Matter.World
  oppeningPosition: Position
  ballRadius: number
  friction: number
  restitution: number
  density: number
}

export function startPlay(options: PlayOptions) {
  const composite = Composite.create({ label: 'Play' })
  Composite.add(options.world, [composite])

  const definition = {
    isStatic: false,
    friction: options.friction,
    restitution: options.restitution,
    density: options.density,
  } satisfies IBodyDefinition

  const ball = new Ball({
    x: options.oppeningPosition.x,
    y: options.oppeningPosition.y,
    radius: options.ballRadius,
    fillStyle: '#FF0000',
    definition,
  })
  Composite.add(composite, [ball.body])
}
