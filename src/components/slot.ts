import Matter, { Bodies } from 'matter-js'

export interface SlotOptions {
  x: number
  y: number
  width: number
  height: number
  cost: number
  fillStyle?: string
}

export class Slot {
  protected _body: Matter.Body
  private _cost: number

  constructor(options: SlotOptions) {
    const { x, y, width, height, cost, fillStyle } = options

    this._cost = cost

    let render = {}
    if (fillStyle) {
      render = { fillStyle }
    }

    this._body = Bodies.rectangle(x, y, width, height, {
      restitution: 0,
      isStatic: true,
      render,
      collisionFilter: {
        //group: 2, // any number that is different from the balls
        category: 0x0002, // any category that is different from the balls
        mask: 0x0001, // any mask that allows collision with the balls
      },
    })
    this._body.label = 'slot'
  }

  get cost(): number {
    return this._cost
  }

  get body(): Matter.Body {
    return this._body
  }

  static CostsForLevels(level: number): number[] {
    const costs = [
      [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6], // 8 lines slot costs
      [5.6, 2, 1.6, 1, 0.7, 0.7, 1, 1.6, 2, 5.6], // 9 lines slot costs
      [8.9, 3, 1.1, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9], // 10 lines slot costs
      [8.4, 3, 1.9, 1.3, 1, 0.7, 0.7, 1, 1.3, 1.9, 3, 8.4], // 11 lines slot costs
      [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10], // 12 lines slot costs
      [8.1, 4, 3, 1.9, 1.2, 0.9, 0.7, 0.7, 0.9, 1.2, 1.9, 3, 4, 8.1], // 13 lines slot costs
      [7.1, 4, 1.9, 1.4, 1.3, 1.1, 1, 0.5, 1, 1.1, 1.3, 1.4, 1.9, 4, 7.1], // 14 lines slot costs
      [15, 8, 3, 2, 1.5, 1.1, 1, 0.7, 0.7, 1, 1.1, 1.5, 2, 3, 8, 15], // 15 lines slot costs
      [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16], // 16 lines slot costs
    ]
    return costs[level]
    //console.log('Static method called');
  }
}
