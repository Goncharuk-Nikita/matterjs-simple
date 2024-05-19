import { ISettings, CanvasMode, Language } from '../types/settings'

//declare let Map: MapConstructor

type SettingsMap = Record<number, ISettings>
type StoreMap = Record<CanvasMode, SettingsMap>

export class Store {
  //private defaults: Map<number, ISettings>
  private _settings?: StoreMap

  constructor() {
    //this._settings = this.initSettings('./game.config.json')
  }

  public getSettings(
    mode: CanvasMode,
    level: number,
  ): ISettings | null | undefined {
    return this._settings && this._settings[mode][level]
  }

  async initSettings(src: string) {
    try {
      const response = await fetch(src)
      const data = await response.json()
      // Use the data here
      //console.log(data)
      this._settings = data
    } catch (error) {
      // Handle any errors
      console.error('Error:', error)
    }
  }

  get language() {
    const tag = localStorage.getItem('language')
    return tag === 'ru' ? Language.RU : Language.EN
  }

  setTimeScale(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.timeScale = value
  }

  setGravityScale(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.gravityScale = value
  }
  setGravityX(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.gravityX = value
  }
  setGravityY(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.gravityY = value
  }

  setGap(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.gap = value
  }

  setSpacing(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.spacing = value
  }

  setPegRadius(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.pegRadius = value
  }
  setPegFriction(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.pegFriction = value
  }
  setPegRestitution(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.pegRestitution = value
  }

  setBallRadius(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.ballRadius = value
  }
  setBallFriction(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.ballFriction = value
  }
  setBallRestitution(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.ballRestitution = value
  }
  setBallFrictionAir(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.ballFrictionAir = value
  }
  setBallSlop(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.ballSlop = value
  }
  setBallDensity(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.ballDensity = value
  }

  setForceMagnitude(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.forceMagnitude = value
  }
  setVelocity(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.velocity = value
  }
  setAngularVelocity(mode: CanvasMode, level: number, value: number) {
    const settings = this._settings && this._settings[mode][level]
    if (settings) settings.angularVelocity = value
  }
}

export function createStore() {
  return new Store()
}
