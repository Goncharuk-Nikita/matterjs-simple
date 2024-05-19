import { Component, ComponentOptions } from './component'

export class Ball extends Component {
  constructor(options: ComponentOptions) {
    const ballOptions = {
      ...options,
      definition: {
        ...options.definition,
        collisionFilter: {
          //group: 1, // any number that is different from the pegs
          category: 0x0001, // any category that is different from the pegs
          mask: 0x0002, // any mask that allows collision with the pegs
        },
      },
    }
    super(ballOptions)
    this._body.label = 'ball'
  }
}
