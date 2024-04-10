import Matter from 'matter-js'

const { Bodies, Composite, Engine, Render, Runner, Svg } = Matter

function run() {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  canvas.width = 791
  canvas.height = 500

  const engine = Engine.create()

  const render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
      width: 791,
      height: 500,
      wireframes: false,
    },
  })

  const ground = Bodies.rectangle(395, 505, 791, 10, { isStatic: true })
  const leftWall = Bodies.rectangle(-11, 0, 10, 1000, { isStatic: true })
  const rightWall = Bodies.rectangle(792, 0, 10, 1000, { isStatic: true })
  const walls = createBucketWalls()
  const obstacles = createObstacles()

  Composite.add(engine.world, [
    ground,
    leftWall,
    rightWall,
    ...walls,
    ...obstacles,
  ])

  Render.run(render)
  const runner = Runner.create()
  Runner.run(runner, engine)

  const heartPath: SVGPathElement = document.getElementById(
    'path-heart',
  ) as unknown as SVGPathElement
  console.log(heartPath)

  const heartVertices = Svg.pathToVertices(heartPath, 1)

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const body = createHeartBall(heartVertices)
      Composite.add(engine.world, [body])
    }, i * 500)
  }
}

function createBucketWalls(): Matter.Body[] {
  const borders: Matter.Body[] = [
    Bodies.rectangle(-1, 0, 1, 1000, { isStatic: true }),
    Bodies.rectangle(792, 0, 1, 1000, { isStatic: true }),
  ]
  for (let i = 0; i < 7; i++) {
    const border = Bodies.rectangle(-1 + i * 113, 521, 2, 200, {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    })
    borders.push(border)
  }
  return borders
}

function createObstacles(): Matter.Body[] {
  const posCircles = [
    { x: 112, y: 421, r: 12, space: 113, n: 6 },
    { x: 53, y: 352, r: 12, space: 113, n: 7 },
    { x: 112, y: 283, r: 12, space: 113, n: 6 },
    { x: 53, y: 214, r: 12, space: 113, n: 7 },
    { x: 112, y: 145, r: 12, space: 113, n: 6 },
  ]

  const circles: Matter.Body[] = []
  for (let i = 0; i < posCircles.length; i++) {
    const pos = posCircles[i]
    for (let j = 0; j < pos.n; j++) {
      const cirle = Bodies.circle(pos.x + j * pos.space, pos.y, pos.r, {
        restitution: 0,
        isStatic: true,
        render: {
          fillStyle: '#F6B23D',
        },
      })
      circles.push(cirle)
    }
  }
  return circles
}

function createHeartBall(heartVertices: Matter.Vector[]) {
  return Bodies.fromVertices(random(300, 491), 0, [heartVertices], {
    restitution: random(0.5, 0.9),
    render: {
      sprite: {
        texture: 'heart.png',
        xScale: 1,
        yScale: 1,
      },
    },
  })
}

function random(a: number, b: number) {
  return Math.random() * (b - a) + a
}

run()
