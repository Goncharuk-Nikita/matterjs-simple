import { Component, ComponentOptions } from './component'

export class Oppening extends Component {
  constructor(options: ComponentOptions) {
    super(options)

    /* disable collition */
    this.body.collisionFilter = {
      group: -1,
      category: 2,
      mask: 0,
    }
  }
}
