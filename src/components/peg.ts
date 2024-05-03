import { Component, ComponentOptions } from './component'

export class Peg extends Component {
  constructor(options: ComponentOptions) {
    const pegOptions = {
      ...options,
      definition: {
        ...options.definition,
        collisionFilter: {
          //group: 2, // any number that is different from the balls
          category: 0x0002, // any category that is different from the balls
          mask: 0x0001, // any mask that allows collision with the balls
        },
      },
    }
    //console.log(pegOptions)
    super(pegOptions)
    this._body.label = 'peg'
  }
}
