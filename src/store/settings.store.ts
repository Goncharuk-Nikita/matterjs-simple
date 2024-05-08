import { Language } from '../types/settings'

export class SettingsStore {
  //private defaults: Map<number, ISettings>

  constructor() {
    //this._settings = this.initSettings('./game.config.json')
  }

  set language(language: Language) {
    let tag

    switch (language) {
      case Language.RU:
        tag = 'ru'
        break
      case Language.EN:
        tag = 'en'
        break
    }
    localStorage.setItem('language', tag)
  }

  get language() {
    const tag = localStorage.getItem('language')
    return tag === 'ru' ? Language.RU : Language.EN
  }
}
