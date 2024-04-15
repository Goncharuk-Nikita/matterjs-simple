import { Component, ComponentOptions } from './component'

export class Ball extends Component {
  constructor(options: ComponentOptions) {
    super(options)
    this._body.label = 'ball'
  }
}
