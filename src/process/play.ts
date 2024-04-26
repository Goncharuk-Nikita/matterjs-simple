import Matter, { IBodyDefinition } from 'matter-js'
import { Ball } from '../components/ball'
import { Position } from '../utilities/position'
const { Composite } = Matter

interface PlayRoundOptions {
  ball: Ball
  composite: Matter.Composite
  path?: boolean[]
}

export interface IManipulationOptions {
  id: number
  level: number
  velocityCof: number
  angularVelocityCof: number
  forceMagnitude: number
}

class PlayRound {
  private ball: Ball
  public composite: Matter.Composite
  //private level: number
  public path?: boolean[]

  constructor(options: PlayRoundOptions) {
    this.ball = options.ball
    this.composite = options.composite
    //this.level = 0
    this.path = options.path
  }

  get body(): Matter.Body {
    return this.ball.body
  }
}

export interface PlayOptions {
  oppeningPosition: Position
  ballRadius: number
  friction: number
  restitution: number
  density: number
  path: boolean[]
}
export class Play {
  static rounds = new Map()
  private world: Matter.World

  constructor(world: Matter.World) {
    this.world = world
  }

  playOne(options: PlayOptions) {
    const composite = Composite.create()
    Composite.add(this.world, [composite])

    const definition = {
      isStatic: false,
      friction: options.friction,
      restitution: options.restitution,
      density: options.density,
    } satisfies IBodyDefinition

    const xScale = (2 * options.ballRadius) / 16
    const yScale = (2 * options.ballRadius) / 16

    let xValue = options.oppeningPosition.x
    if (options.path[0]) {
      xValue += 1
    } else {
      xValue -= 1
    }

    const ball = new Ball({
      x: xValue,
      y: options.oppeningPosition.y,
      radius: options.ballRadius,
      //fillStyle: '#FF0000',
      sprite: {
        xScale,
        yScale,
        texture: './public/assets/png/ball.png',
      },
      definition,
    })

    const round = new PlayRound({ ball, composite, path: options.path })
    Play.rounds.set(ball.body.id, round)

    Composite.add(composite, [ball.body])
  }

  removeById(id: number) {
    const round = Play.rounds.get(id)
    Play.rounds.delete(id)

    const composite = round?.composite
    if (composite) {
      Composite.remove(this.world, [composite])
    }
  }

  applyForce(options: IManipulationOptions) {
    const { id, level, velocityCof, angularVelocityCof } = options
    let { forceMagnitude } = options

    const round = Play.rounds.get(id)
    const body = round.ball.body
    const right = round.path[level]
    if (!right) {
      forceMagnitude *= -1
    }

    setTimeout(() => {
      Matter.Body.setVelocity(body, {
        x: body.velocity.x * velocityCof,
        y: body.velocity.y * velocityCof,
      })
      Matter.Body.setAngularVelocity(
        body,
        body.angularVelocity * angularVelocityCof,
      )
      Matter.Body.applyForce(body, body.position, { x: forceMagnitude, y: 0 })
    }, 1)
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

export function isPegCollision(collision: any) {
  const labelA = collision.bodyA.label
  const labelB = collision.bodyB.label

  if (labelA == 'peg' && labelB == 'ball') {
    return true
  }
  if (labelA == 'ball' && labelB == 'peg') {
    return true
  }
  return false
}

export function getBallById(collision: any) {
  const labelA = collision.bodyA.label
  if (labelA == 'ball') {
    return collision.bodyA
  }
  return collision.bodyB
}

export function getSlotById(collision: any) {
  const labelA = collision.bodyA.label
  if (labelA == 'slot') {
    return collision.bodyA
  }
  return collision.bodyB
}

export function getPegById(collision: any) {
  const labelA = collision.bodyA.label
  if (labelA == 'peg') {
    return collision.bodyA
  }
  return collision.bodyB
}
