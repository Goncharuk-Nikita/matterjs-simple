import { EventEmitter } from 'events'

export class Inputs {
  private gapInput: HTMLInputElement
  private spacingInput: HTMLInputElement
  private ballRadiusInput: HTMLInputElement
  private pegRadiusInput: HTMLInputElement
  private speedCofInput: HTMLInputElement

  private emitter: EventEmitter

  constructor() {
    this.gapInput = document.getElementById('gap-input') as HTMLInputElement
    this.spacingInput = document.getElementById(
      'spacing-input',
    ) as HTMLInputElement
    this.pegRadiusInput = document.getElementById(
      'peg-radius-input',
    ) as HTMLInputElement
    this.ballRadiusInput = document.getElementById(
      'ball-radius-input',
    ) as HTMLInputElement
    this.speedCofInput = document.getElementById(
      'speed-cof-input',
    ) as HTMLInputElement

    this.emitter = new EventEmitter()
    console.log(this.emitter)

    this.gapInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.spacingInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.pegRadiusInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.ballRadiusInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
  }

  get dispatcher() {
    return this.emitter
  }

  private onChange(input: HTMLInputElement, dispatcher: EventEmitter) {
    console.log(dispatcher)

    if (input.hasAttribute('rebuild')) {
      dispatcher.emit('rebuild', {})
    }
  }

  get gap(): number {
    return +this.gapInput.value
  }

  get spacing(): number {
    return +this.spacingInput.value
  }

  get ballRadius(): number {
    return +this.ballRadiusInput.value
  }

  get pegRadius(): number {
    return +this.pegRadiusInput.value
  }

  get speedCof(): number {
    return +this.speedCofInput.value
  }
}
