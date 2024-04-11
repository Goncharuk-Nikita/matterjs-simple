import Matter from 'matter-js'
export const resize = (render: Matter.Render, element: HTMLElement) => {
  render.bounds.max.x = element.clientWidth
  render.bounds.max.y = element.clientHeight
  render.options.width = element.clientWidth
  render.options.height = element.clientHeight
  render.canvas.width = element.clientWidth
  render.canvas.height = element.clientHeight
  Matter.Render.setPixelRatio(render, window.devicePixelRatio) // added this
}
