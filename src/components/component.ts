import Matter, { Bodies, IBodyDefinition } from 'matter-js'

export interface Sprite {
  texture: string
  xScale: number
  yScale: number
}

export interface ComponentOptions {
  x: number
  y: number
  radius: number
  fillStyle?: string
  sprite?: Sprite
  definition: IBodyDefinition
}

export class Component {
  protected _body: Matter.Body

  constructor(options: ComponentOptions) {
    const { x, y, radius, fillStyle, definition, sprite } = options

    let render = {}
    if (fillStyle) {
      render = { fillStyle }
    }

    if (sprite) {
      render = { sprite }
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
