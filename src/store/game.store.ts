import { ISettings, CanvasMode } from '../types/settings'

//declare let Map: MapConstructor

type SettingsMap = Record<number, ISettings>
type StoreMap = Record<CanvasMode, SettingsMap>

export class Store {
  //private defaults: Map<number, ISettings>
  private _settings?: StoreMap

  constructor() {
    //this._settings = this.initSettings('./game.config.json')
  }

  public getSettings(mode: CanvasMode, level: number): ISettings | undefined {
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
}

export function createStore() {
  return new Store()
}
