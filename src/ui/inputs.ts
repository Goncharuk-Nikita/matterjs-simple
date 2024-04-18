import { EventEmitter } from 'events'
import { ISettings } from '../types/settings'

export class Inputs {
  private gapInput: HTMLInputElement
  private spacingInput: HTMLInputElement

  private ballRadiusInput: HTMLInputElement
  private ballFrictionInput: HTMLInputElement
  private ballRestitutionInput: HTMLInputElement
  private ballDensityInput: HTMLInputElement
  private ballFrictionAirInput: HTMLInputElement
  private ballSlopInput: HTMLInputElement

  private pegRadiusInput: HTMLInputElement
  private pegFrictionInput: HTMLInputElement
  private pegRestitutionInput: HTMLInputElement

  private timeScaleInput: HTMLInputElement

  private gravityScaleInput: HTMLInputElement
  private gravityXInput: HTMLInputElement
  private gravityYInput: HTMLInputElement

  private forceMagnitudeInput: HTMLInputElement
  private velocityInput: HTMLInputElement
  private angularVelocityInput: HTMLInputElement

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
    this.ballFrictionAirInput = document.getElementById(
      'ball-friction-air-input',
    ) as HTMLInputElement
    this.ballSlopInput = document.getElementById(
      'ball-slop-input',
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
    this.velocityInput = document.getElementById(
      'velocity-input',
    ) as HTMLInputElement
    this.angularVelocityInput = document.getElementById(
      'angular-velocity-input',
    ) as HTMLInputElement

    this.emitter = new EventEmitter()

    this.forceMagnitudeInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.velocityInput.addEventListener('change', (e) =>
      this.onChange(e.currentTarget as HTMLInputElement, this.emitter),
    )
    this.angularVelocityInput.addEventListener('change', (e) =>
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

  get ballFrictionAir(): number {
    return +this.ballFrictionAirInput.value
  }

  get ballSlop(): number {
    return +this.ballSlopInput.value
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
  get velocity(): number {
    return +this.velocityInput.value
  }
  get angularVelocity(): number {
    return +this.angularVelocityInput.value
  }

  setSettings(settings: ISettings) {
    /* engine */
    this.timeScaleInput.value = settings.timeScale.toString()
    /* world */
    this.gravityScaleInput.value = settings.gravityScale.toString()
    this.gravityXInput.value = settings.gravityX.toString()
    this.gravityYInput.value = settings.gravityY.toString()
    /* field settings */
    this.gapInput.value = settings.gap.toString()
    this.spacingInput.value = settings.spacing.toString()
    this.pegRadiusInput.value = settings.pegRadius.toString()
    this.pegFrictionInput.value = settings.pegFriction.toString()
    this.pegRestitutionInput.value = settings.pegRestitution.toString()
    /* ball settings */
    this.ballRadiusInput.value = settings.ballRadius.toString()
    this.ballFrictionInput.value = settings.ballFriction.toString()
    this.ballRestitutionInput.value = settings.ballRestitution.toString()
    this.ballDensityInput.value = settings.ballDensity.toString()

    this.ballFrictionAirInput.value = settings.ballFrictionAir.toString()
    this.ballSlopInput.value = settings.ballSlop.toString()
    /* hit manipulation settings */
    this.forceMagnitudeInput.value = settings.forceMagnitude.toString()
    this.velocityInput.value = settings.velocity.toString()
    this.angularVelocityInput.value = settings.angularVelocity.toString()
  }

  get settings(): ISettings {
    return {
      gravityScale: this.gravityScale,
      gravityX: this.gravityX,
      gravityY: this.gravityY,
      forceMagnitude: this.forceMagnitude,
      velocity: this.velocity,
      angularVelocity: this.angularVelocity,
      timeScale: this.timeScale,
      gap: this.gap,
      spacing: this.spacing,
      pegRadius: this.pegRadius,
      pegFriction: this.pegFriction,
      pegRestitution: this.pegRestitution,
      ballRadius: this.ballRadius,
      ballFriction: this.ballFriction,
      ballRestitution: this.ballRestitution,
      ballDensity: this.ballDensity,
      ballFrictionAir: this.ballFrictionAir,
      ballSlop: this.ballSlop,
    } satisfies ISettings
  }
}
