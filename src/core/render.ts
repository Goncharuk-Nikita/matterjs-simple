import Matter from 'matter-js'

export function createRender(engine: Matter.Engine, element: HTMLElement) {
  const render = Matter.Render.create({
    engine,
    element,
    options: {
      width: element.clientWidth,
      height: element.clientHeight,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio, // here
    },
  })

  Matter.Render.run(render)
  const runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)

  return render
}
