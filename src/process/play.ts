import Matter, { IBodyDefinition } from 'matter-js'
import { Ball } from '../components/ball'
import { Position } from '../utilities/position'
const { Composite } = Matter

interface PlayRoundOptions {
  ball: Ball
  composite: Matter.Composite
  path?: boolean[]
}

class PlayRound {
  private ball: Ball
  public composite: Matter.Composite
  private level: number
  private path?: boolean[]

  constructor(options: PlayRoundOptions) {
    this.ball = options.ball
    this.composite = options.composite
    this.level = 0
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

    const ball = new Ball({
      x: options.oppeningPosition.x,
      y: options.oppeningPosition.y,
      radius: options.ballRadius,
      fillStyle: '#FF0000',
      definition,
    })

    const round = new PlayRound({ ball, composite })

    Play.rounds.set(ball.body.id, round)
    console.log(ball.body.id)

    Composite.add(composite, [ball.body])
  }

  removeById(id: number) {
    const round = Play.rounds.get(id)
    Play.rounds.delete(id)

    const composite = round.composite
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
