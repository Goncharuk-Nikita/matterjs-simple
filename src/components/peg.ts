import { Component, ComponentOptions } from './component'

export class Peg extends Component {
  constructor(options: ComponentOptions) {
    super(options)
    this._body.label = 'peg'
  }
}
