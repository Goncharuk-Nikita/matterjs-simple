import Matter, { Composite } from 'matter-js'
import { Peg } from './peg'
import { Oppening } from './openning'
import { Position } from '../utilities/position'

export interface SetupOptions {
  levels: number
  pegRadius: number
  gap: number
  spacing: number
}

export class Field {
  private world: Matter.World
  private _width: number
  private _height: number
  private _container: Matter.Composite
  private _oppening?: Oppening
  private _oppeningPosition: Position

  constructor(world: Matter.World) {
    this.world = world
    this._width = 0
    this._height = 0
    this._container = Composite.create({ label: 'Field' })
    this._oppeningPosition = new Position(0, 0)
    Composite.add(this.world, [this._container])
  }

  init(options: SetupOptions) {
    const lines = 2 + options.levels

    //const slotCosts = Slot.CostsForLevels(options.levels - 8)
    //console.log(slotCosts)

    const fillStyle = '#F6B23D'

    const pegs: Peg[] = []
    const bodies: Matter.Body[] = []
    //const slots: Slot[] = []

    const fraction = 7 / lines
    let spaceBottom = options.spacing

    //const texture = await Assets.load(`${options.path}/${options.pegSource}`)
    //let currentRow = 0

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
          fillStyle,
          isStatic: true,
        })
        this._width = spaceLeft + options.pegRadius
        spaceLeft += options.gap * 2 * fraction
        pegs.push(peg)
        bodies.push(peg.body)
      }
      spaceBottom += options.spacing * fraction
      //currentRow++
    }

    this._height = spaceBottom + options.pegRadius

    this._oppeningPosition = new Position(pegs[1].body.position.x, 0)

    this._oppening = new Oppening({
      x: this._oppeningPosition.x,
      y: this._oppeningPosition.y,
      radius: 20,
      fillStyle: '#2b2b2b',
      isStatic: true,
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
}
