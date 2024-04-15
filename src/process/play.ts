import Matter, { IBodyDefinition } from 'matter-js'
import { Ball } from '../components/ball'
import { Position } from '../utilities/position'
const { Composite } = Matter

export interface PlayOptions {
  oppeningPosition: Position
  ballRadius: number
  friction: number
  restitution: number
  density: number
}

export class Play {
  static composites = new Map()
  private world: Matter.World

  constructor(world: Matter.World) {
    this.world = world
  }

  playOne(options: PlayOptions) {
    //if (this.composite) {
    //  Composite.remove(this.world, [this.composite])
    //}
    const composite = Composite.create({ label: 'Play_' + Math.random() })
    Composite.add(this.world, [composite])

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

    Play.composites.set(ball.body.id, composite)
    console.log(ball.body.id)

    Composite.add(composite, [ball.body])
  }

  removeById(id: number) {
    const composite = Play.composites.get(id)
    if (composite) {
      Composite.remove(this.world, [composite])
    }
  }
}

export function isSlotCollision(collision: any) {
  const labelA = collision.bodyA.label
  const labelB = collision.bodyB.label

  if (labelA == 'slot' && labelB == 'ball') {
    return true
  }
  if (labelA == 'ball' && labelB == 'slot') {
    return true
  }
  return false
}

export function getBallId(collision: any) {
  const labelA = collision.bodyA.label
  if (labelA == 'ball') {
    return collision.bodyA.id
  }
  return collision.bodyB.id
}
