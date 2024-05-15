import Matter from 'matter-js'

interface IRenderProxyOptions {
  engine: Matter.Engine
  element: HTMLElement
}

export class RenderProxy {
  private _render: Matter.Render
  private _runner?: Matter.Runner

  constructor(options: IRenderProxyOptions) {
    const { engine, element } = options
    this._render = Matter.Render.create({
      engine,
      element,
      options: {
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio, // here
      },
    })
  }

  initRunner(engine: Matter.Engine, delta: number) {
    if (this._runner) {
      Matter.Runner.stop(this._runner)
    }
    this._runner = Matter.Runner.create({ delta })
    Matter.Runner.run(this._runner, engine)
  }

  run() {
    Matter.Render.run(this._render)
  }

  stop() {
    if (this._runner) {
      Matter.Runner.stop(this._runner)
    }
  }

  get render(): Matter.Render {
    return this._render
  }
}
