import { ISettings } from '../types/settings'

export class Store {
  static Defaults = {
    /* engine defaults */
    timeScale: 1,
    /* world defaults */
    gravityScale: 0.001,
    gravityX: 0,
    gravityY: 1,
    /* field defaults */
    gap: 57,
    spacing: 75,
    pegRadius: 7.5,
    pegFriction: 0.0,
    pegRestitution: 0.3,
    /* ball defaults */
    ballRadius: 23.5,
    ballFriction: 0.0,
    ballRestitution: 0.5,
    ballDensity: 0.01,
    /* hit manipulation defaults */
    forceMagnitude: 0.3,
    velocity: 0.003,
    angularVelocity: 0.1,
  }

  private _gap: number
  private _spacing: number
  private _ballRadius: number
  private _pegFriction: number
  private _pegRestitution: number
  private _ballFriction: number
  private _ballRestitution: number
  private _ballDensity: number
  private _pegRadius: number
  private _timeScale: number
  private _gravityScale: number
  private _gravityX: number
  private _gravityY: number
  private _forceMagnitude: number
  private _velocity: number
  private _angularVelocity: number
  constructor() {
    /* engine settings */
    this._timeScale = Store.getItem('timeScale', Store.Defaults.timeScale)
    /* world settings */
    this._gravityScale = Store.getItem(
      'gravityScale',
      Store.Defaults.gravityScale,
    )
    this._gravityX = Store.getItem('gravityX', Store.Defaults.gravityX)
    this._gravityY = Store.getItem('gravityY', Store.Defaults.gravityY)
    /* field settings */
    this._spacing = Store.getItem('spacing', Store.Defaults.spacing)
    this._gap = Store.getItem('gap', Store.Defaults.gap)
    this._pegRadius = Store.getItem('pegRadius', Store.Defaults.pegRadius)
    this._pegFriction = Store.getItem('pegFriction', Store.Defaults.pegFriction)
    this._pegRestitution = Store.getItem(
      'pegRestitution',
      Store.Defaults.pegRestitution,
    )
    /* ball settings */
    this._ballRadius = Store.getItem('ballRadius', Store.Defaults.ballRadius)
    this._ballFriction = Store.getItem(
      'ballFriction',
      Store.Defaults.ballFriction,
    )
    this._ballRestitution = Store.getItem(
      'ballRestitution',
      Store.Defaults.ballRestitution,
    )
    this._ballDensity = Store.getItem('ballDensity', Store.Defaults.ballDensity)
    /* hit manipulation settings */
    this._forceMagnitude = Store.getItem(
      'forceMagnitude',
      Store.Defaults.forceMagnitude,
    )
    this._velocity = Store.getItem('velocityCof', Store.Defaults.velocity)
    this._angularVelocity = Store.getItem(
      'angularVelocityCof',
      Store.Defaults.angularVelocity,
    )
  }

  private static getItem(key: string, alternate: number) {
    const value = localStorage.getItem(key)
    return value ? +value : alternate
  }

  private static setItem(key: string, value: number) {
    localStorage.setItem(key, value.toString())
    //return value ? +value : alternate
  }

  get gap(): number {
    return this._gap
  }

  get spacing(): number {
    return this._spacing
  }

  get ballRadius(): number {
    return this._ballRadius
  }

  get pegFriction(): number {
    return this._pegFriction
  }

  get pegRestitution(): number {
    return this._pegRestitution
  }

  get ballFriction(): number {
    return this._ballFriction
  }

  get ballRestitution(): number {
    return this._ballRestitution
  }

  get ballDensity(): number {
    return this._ballDensity
  }

  get pegRadius(): number {
    return this._pegRadius
  }

  get timeScale(): number {
    return this._timeScale
  }

  get gravityScale(): number {
    return this._gravityScale
  }
  get gravityX(): number {
    return this._gravityX
  }
  get gravityY(): number {
    return this._gravityY
  }

  get forceMagnitude(): number {
    return this._forceMagnitude
  }
  get velocity(): number {
    return this._velocity
  }
  get angularVelocity(): number {
    return this._angularVelocity
  }

  get settings(): ISettings {
    return {
      timeScale: this._timeScale,
      gravityScale: this._gravityScale,
      gravityX: this._gravityX,
      gravityY: this._gravityY,
      gap: this._gap,
      spacing: this._spacing,
      pegRadius: this._pegRadius,
      pegFriction: this._pegFriction,
      pegRestitution: this._pegRestitution,
      ballRadius: this._ballRadius,
      ballFriction: this._ballFriction,
      ballRestitution: this._ballRestitution,
      ballDensity: this._ballDensity,
      forceMagnitude: this._forceMagnitude,
      velocity: this._velocity,
      angularVelocity: this._angularVelocity,
    } satisfies ISettings
  }

  save(settings: ISettings) {
    Store.setItem('timeScale', settings.timeScale)

    Store.setItem('gravityScale', settings.gravityScale)
    Store.setItem('gravityX', settings.gravityX)
    Store.setItem('gravityY', settings.gravityY)

    Store.setItem('gap', settings.gap)
    Store.setItem('spacing', settings.spacing)

    Store.setItem('pegRadius', settings.pegRadius)
    Store.setItem('pegFriction', settings.pegFriction)
    Store.setItem('pegRestitution', settings.pegRestitution)

    Store.setItem('ballRadius', settings.ballRadius)
    Store.setItem('ballFriction', settings.ballFriction)
    Store.setItem('ballRestitution', settings.ballRestitution)
    Store.setItem('balllDensity', settings.ballDensity)

    Store.setItem('forceMagnitude', settings.forceMagnitude)
    Store.setItem('angularVelocity', settings.angularVelocity)

    Store.setItem('velocity', settings.velocity)
  }
}

export function createStore() {
  return new Store()
}
