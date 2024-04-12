import Matter from 'matter-js'
import { Ball } from '../components/ball'
import { Position } from '../utilities/position'
const { Composite } = Matter

export interface PlayOptions {
  world: Matter.World
  oppeningPosition: Position
  ballRadius: number
}

export function startPlay(options: PlayOptions) {
  const composite = Composite.create({ label: 'Play' })
  Composite.add(options.world, [composite])
  const ball = new Ball({
    x: options.oppeningPosition.x,
    y: options.oppeningPosition.y,
    radius: options.ballRadius,
    fillStyle: '#FF0000',
    isStatic: false,
  })
  Composite.add(composite, [ball.body])
}
