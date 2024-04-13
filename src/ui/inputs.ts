import { EventEmitter } from 'events'

export class Inputs {
  private gapInput: HTMLInputElement
  private spacingInput: HTMLInputElement

  private ballRadiusInput: HTMLInputElement
  private ballFrictionInput: HTMLInputElement
  private ballRestitutionInput: HTMLInputElement
  private ballDensityInput: HTMLInputElement

  private pegRadiusInput: HTMLInputElement
  private pegFrictionInput: HTMLInputElement
  private pegRestitutionInput: HTMLInputElement

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
    this.pegFrictionInput = document.getElementById(
      'peg-friction-input',
    ) as HTMLInputElement
    this.pegRestitutionInput = document.getElementById(
      'peg-restitution-input',
    ) as HTMLInputElement

    this.ballRadiusInput = document.getElementById(
      'ball-radius-input',
    ) as HTMLInputElement
    this.ballFrictionInput = document.getElementById(
      'ball-friction-input',
    ) as HTMLInputElement
    this.ballRestitutionInput = document.getElementById(
      'ball-restitution-input',
    ) as HTMLInputElement
    this.ballDensityInput = document.getElementById(
      'ball-density-input',
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
    this.pegFrictionInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.pegRestitutionInput.addEventListener('change', (e) =>
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

  get pegFriction(): number {
    return +this.pegFrictionInput.value
  }

  get pegRestitution(): number {
    return +this.pegRestitutionInput.value
  }

  get ballFriction(): number {
    return +this.ballFrictionInput.value
  }

  get ballRestitution(): number {
    return +this.ballRestitutionInput.value
  }

  get ballDensity(): number {
    return +this.ballDensityInput.value
  }

  get pegRadius(): number {
    return +this.pegRadiusInput.value
  }

  get speedCof(): number {
    return +this.speedCofInput.value
  }
}
