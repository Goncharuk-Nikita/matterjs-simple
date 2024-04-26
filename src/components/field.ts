import Matter, { Composite, IBodyDefinition } from 'matter-js'
import { Peg } from './peg'
import { Oppening } from './openning'
import { Position } from '../utilities/position'
import { Slot } from './slot'

export interface SetupOptions {
  levels: number
  pegRadius: number
  gap: number
  spacing: number
  pegFriction: number
  pegRestitution: number
}

export class Field {
  private world: Matter.World
  private _width: number
  private _height: number
  private _container: Matter.Composite
  private _oppening?: Oppening
  private _oppeningPosition: Position

  static pegs = new Map()

  constructor(world: Matter.World) {
    this.world = world
    this._width = 0
    this._height = 0
    this._container = Composite.create({ label: 'Field' })
    this._oppeningPosition = new Position(0, 0)
    Composite.add(this.world, [this._container])
  }

  init(options: SetupOptions) {
    Field.pegs.clear()

    const lines = 2 + options.levels

    //const fillStyle = '#F6B23D'

    // const xScale = (2 * options.pegRadius) / 158
    // const yScale = (2 * options.pegRadius) / 169

    // const sprite = {
    //   texture: 'images/circle.png',
    //   xScale,
    //   yScale,
    // }

    const pegs: Peg[] = []
    const slots: Slot[] = []
    const bodies: Matter.Body[] = []
    //const slots: Slot[] = []

    const fraction = 7 / lines
    let spaceBottom = options.spacing

    const definition = {
      isStatic: true,
    } satisfies IBodyDefinition

    const pegDefinition = {
      isStatic: true,
      friction: options.pegFriction,
      restitution: options.pegRestitution,
    } satisfies IBodyDefinition

    let currentLine = 0

    const texture = `assets/png/peg/peg.png`
    const xScale = (options.pegRadius * 2) / 12
    const yScale = (options.pegRadius * 2) / 12

    const sprite = {
      texture,
      xScale,
      yScale,
    }

    for (let i = 3; i <= lines; i++) {
      let spaceLeft = 0
      for (let space = 1; space <= lines - i; space++) {
        spaceLeft += options.gap * fraction
      }

      for (let point = 1; point <= i; point++) {
        const peg = new Peg({
          x: spaceLeft,
          y: spaceBottom,
          radius: options.pegRadius,
          sprite,
          //fillStyle,
          definition: pegDefinition,
        })
        this._width = spaceLeft + options.pegRadius
        spaceLeft += options.gap * 2 * fraction
        pegs.push(peg)
        bodies.push(peg.body)
        Field.pegs.set(peg.body.id, currentLine)
      }
      spaceBottom += options.spacing * fraction
      currentLine++
    }

    //const slotWidth = options.gap * fraction + options.pegRadius * 2

    const slotCosts = Slot.CostsForLevels(options.levels - 8)

    const firstX = pegs[pegs.length - 1 - slotCosts.length].body.position.x
    const secondX = pegs[pegs.length - 1 - slotCosts.length + 1].body.position.x
    const slotWidth = secondX - firstX - 0.5

    for (let s = 0; s < slotCosts.length; s++) {
      const temp_bottom_peg = pegs[pegs.length - 1 - slotCosts.length + s] // taking each bottom peg so its x can be used as a referrence point for each slot
      const cost = slotCosts[s]
      //const slotTexture = await Assets.load(`${options.path}/${cost}.png`)
      const slotX = temp_bottom_peg.body.position.x + slotWidth / 2

      console.log(cost)

      const texture = `assets/png/slots/${options.levels}/${cost}.png`
      const xScale = 1 //(slotWidth / 200) * 0.99
      const yScale = 1 //xScale
      const sprite = {
        texture,
        xScale,
        yScale,
      }

      const slot = new Slot({
        x: slotX,
        y: spaceBottom,
        width: slotWidth,
        height: 60 - lines,
        //fillStyle: '#00ff00',
        sprite,
        cost,
      })
      slots.push(slot)
      bodies.push(slot.body)
    }

    this._height = spaceBottom + options.pegRadius

    this._oppeningPosition = new Position(pegs[1].body.position.x, 2)

    this._oppening = new Oppening({
      x: this._oppeningPosition.x,
      y: this._oppeningPosition.y,
      radius: 20,
      //fillStyle: '#2b2b2b',
      sprite: {
        texture: 'assets/png/oppening.png',
        xScale: 1,
        yScale: 1,
      },
      definition,
    })
    bodies.push(this._oppening.body)

    Composite.add(this._container, bodies)
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get container() {
    return this._container
  }

  get oppeningPosition() {
    return this._oppeningPosition
  }

  getPegLine(id: number) {
    return Field.pegs.get(id)
  }
}
