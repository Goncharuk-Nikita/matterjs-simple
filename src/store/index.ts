import { ISettings } from '../types/settings'
import { Settings } from '../settings'

declare let Map: MapConstructor

export class Store {
  //private defaults: Map<number, ISettings>
  private _settings: Map<number, ISettings>

  constructor() {
    const defaults = this.getDefaultSettings()
    this._settings = this.initSettings(defaults)
  }

  public getSettings(level: number): ISettings {
    return this._settings.get(level) as ISettings
  }

  public saveSettings(level: number, settings: ISettings) {
    this._settings.set(level, settings)
    Store.setItem(`${level}_timeScale`, settings.timeScale)
    Store.setItem(`${level}_gravityScale`, settings.gravityScale)
    Store.setItem(`${level}_gravityX`, settings.gravityX)
    Store.setItem(`${level}_gravityY`, settings.gravityY)
    Store.setItem(`${level}_gap`, settings.gap)
    Store.setItem(`${level}_spacing`, settings.spacing)
    Store.setItem(`${level}_pegRadius`, settings.pegRadius)
    Store.setItem(`${level}_pegFriction`, settings.pegFriction)
    Store.setItem(`${level}_pegRestitution`, settings.pegRestitution)
    Store.setItem(`${level}_ballRadius`, settings.ballRadius)
    Store.setItem(`${level}_ballFriction`, settings.ballFriction)
    Store.setItem(`${level}_ballRestitution`, settings.ballRestitution)
    Store.setItem(`${level}_ballDensity`, settings.ballDensity)
    Store.setItem(`${level}_ballFrictionAir`, settings.ballFrictionAir)
    Store.setItem(`${level}_ballSlop`, settings.ballSlop)
    Store.setItem(`${level}_forceMagnitude`, settings.forceMagnitude)
    Store.setItem(`${level}_velocity`, settings.velocity)
    Store.setItem(`${level}_angularVelocity`, settings.angularVelocity)
  }

  public toJSON(): string {
    return JSON.stringify([...this._settings])
    //return JSON.stringify(Array.from(this._settings.entries()))
  }

  private initSettings(
    defaults: Map<number, ISettings>,
  ): Map<number, ISettings> {
    const allSettings = new Map()
    for (const [key, value] of defaults) {
      const defaultLevelSettings = value
      const levelSettings = new Settings({
        timeScale: Store.getItem(
          `${key}_timeScale`,
          defaultLevelSettings.timeScale,
        ),
        gravityScale: Store.getItem(
          `${key}_gravityScale`,
          defaultLevelSettings.gravityScale,
        ),
        gravityX: Store.getItem(
          `${key}_gravityX`,
          defaultLevelSettings.gravityX,
        ),
        gravityY: Store.getItem(
          `${key}_gravityY`,
          defaultLevelSettings.gravityY,
        ),
        gap: Store.getItem(`${key}_gap`, defaultLevelSettings.gap),
        spacing: Store.getItem(`${key}_spacing`, defaultLevelSettings.spacing),
        pegRadius: Store.getItem(
          `${key}_pegRadius`,
          defaultLevelSettings.pegRadius,
        ),
        pegFriction: Store.getItem(
          `${key}_pegFriction`,
          defaultLevelSettings.pegFriction,
        ),
        pegRestitution: Store.getItem(
          `${key}_pegRestitution`,
          defaultLevelSettings.pegRestitution,
        ),
        ballRadius: Store.getItem(
          `${key}_ballRadius`,
          defaultLevelSettings.ballRadius,
        ),
        ballFriction: Store.getItem(
          `${key}_ballFriction`,
          defaultLevelSettings.ballFriction,
        ),
        ballFrictionAir: Store.getItem(
          `${key}_ballFrictionAir`,
          defaultLevelSettings.ballFrictionAir,
        ),
        ballSlop: Store.getItem(
          `${key}_ballSlop`,
          defaultLevelSettings.ballSlop,
        ),
        ballRestitution: Store.getItem(
          `${key}_ballRestitution`,
          defaultLevelSettings.ballRestitution,
        ),
        ballDensity: Store.getItem(
          `${key}_ballDensity`,
          defaultLevelSettings.ballDensity,
        ),
        forceMagnitude: Store.getItem(
          `${key}_forceMagnitude`,
          defaultLevelSettings.forceMagnitude,
        ),
        velocity: Store.getItem(
          `${key}_velocity`,
          defaultLevelSettings.velocity,
        ),
        angularVelocity: Store.getItem(
          `${key}_angularVelocity`,
          defaultLevelSettings.angularVelocity,
        ),
      })

      allSettings.set(key, levelSettings)
    }

    return allSettings
  }

  private static setItem(key: string, value: number) {
    localStorage.setItem(key, value.toString())
    //return value ? +value : alternate
  }

  private static getItem(key: string, alternate: number) {
    const value = localStorage.getItem(key)
    return value ? +value : alternate
  }

  private getDefaultSettings(): Map<number, ISettings> {
    const defaults = new Map()

    /* level 8 */
    const level8 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(8, level8)

    /* level 9 */
    const level9 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(9, level9)

    /* level 10 */
    const level10 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(10, level10)

    /* level 11 */
    const level11 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(11, level11)

    /* level 12 */
    const level12 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(12, level12)

    /* level 13 */
    const level13 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(13, level13)

    /* level 14 */
    const level14 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(14, level14)

    /* level 15 */
    const level15 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(15, level15)

    /* level 16 */
    const level16 = new Settings({
      timeScale: 1,
      gravityScale: 0.001,
      gravityX: 0,
      gravityY: 1,
      gap: 57,
      spacing: 75,
      pegRadius: 7.5,
      pegFriction: 0.0,
      pegRestitution: 0.3,
      ballRadius: 23.5,
      ballFriction: 0.0,
      ballFrictionAir: 0.06,
      ballSlop: 0,
      ballRestitution: 0.5,
      ballDensity: 0.01,
      forceMagnitude: 0.3,
      velocity: 0.003,
      angularVelocity: 0.1,
    })
    defaults.set(16, level16)
    return defaults
  }
}

export function createStore() {
  return new Store()
}
