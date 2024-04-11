import Matter, { Bodies } from 'matter-js'

export interface ComponentOptions {
  x: number
  y: number
  radius: number
  fillStyle?: string
  isStatic: boolean
}

export class Component {
  protected _body: Matter.Body

  constructor(options: ComponentOptions) {
    const { x, y, radius, fillStyle, isStatic } = options

    let render = {}
    if (fillStyle) {
      render = { fillStyle }
    }

    this._body = Bodies.circle(x, y, radius, {
      restitution: 0,
      isStatic,
      render,
    })
  }

  get body(): Matter.Body {
    return this._body
  }
}
