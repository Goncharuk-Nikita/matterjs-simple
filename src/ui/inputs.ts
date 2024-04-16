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

  private timeScaleInput: HTMLInputElement

  private gravityScaleInput: HTMLInputElement
  private gravityXInput: HTMLInputElement
  private gravityYInput: HTMLInputElement

  private forceMagnitudeInput: HTMLInputElement
  private velocityCofInput: HTMLInputElement
  private angularVelocityCofInput: HTMLInputElement

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

    this.timeScaleInput = document.getElementById(
      'time-scale-input',
    ) as HTMLInputElement

    this.gravityScaleInput = document.getElementById(
      'gravity-scale-input',
    ) as HTMLInputElement
    this.gravityXInput = document.getElementById(
      'gravity-x-input',
    ) as HTMLInputElement
    this.gravityYInput = document.getElementById(
      'gravity-y-input',
    ) as HTMLInputElement

    this.forceMagnitudeInput = document.getElementById(
      'force-magnitude-input',
    ) as HTMLInputElement
    this.velocityCofInput = document.getElementById(
      'velocity-cof-input',
    ) as HTMLInputElement
    this.angularVelocityCofInput = document.getElementById(
      'angular-velocity-cof-input',
    ) as HTMLInputElement

    this.emitter = new EventEmitter()

    this.forceMagnitudeInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.velocityCofInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.angularVelocityCofInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )

    this.gravityScaleInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.gravityXInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.gravityYInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )

    this.timeScaleInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )

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
    if (input.hasAttribute('world')) {
      dispatcher.emit('world', {})
    }
    if (input.hasAttribute('engine')) {
      dispatcher.emit('engine', {})
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

  get timeScale(): number {
    return +this.timeScaleInput.value
  }

  get gravityScale(): number {
    return +this.gravityScaleInput.value
  }
  get gravityX(): number {
    return +this.gravityXInput.value
  }
  get gravityY(): number {
    return +this.gravityYInput.value
  }

  get forceMagnitude(): number {
    return +this.forceMagnitudeInput.value
  }
  get velocityCof(): number {
    return +this.velocityCofInput.value
  }
  get angularVelocityCof(): number {
    return +this.angularVelocityCofInput.value
  }
}
