import { Language } from '../types/settings'
export class ControlsStore {
  constructor() {
    //this._settings = this.initSettings('./game.config.json')
  }
  get language() {
    const tag = localStorage.getItem('language')
    return tag === 'ru' ? Language.RU : Language.EN
  }
}
