import Matter, { Bodies, IBodyDefinition } from 'matter-js'

export interface ComponentOptions {
  x: number
  y: number
  radius: number
  fillStyle?: string
  definition: IBodyDefinition
}

export class Component {
  protected _body: Matter.Body

  constructor(options: ComponentOptions) {
    const { x, y, radius, fillStyle, definition } = options

    let render = {}
    if (fillStyle) {
      render = { fillStyle }
    }

    this._body = Bodies.circle(x, y, radius, {
      restitution: 0,
      render,
      ...definition,
    })
  }

  get body(): Matter.Body {
    return this._body
  }
}
