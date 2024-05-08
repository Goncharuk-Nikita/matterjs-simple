//import { EventEmitter } from 'events'

import { Language } from '../types/settings'

export class SettingsLocale {
  private _ruBtn: HTMLButtonElement | undefined
  private _enBtn: HTMLButtonElement | undefined

  private _playForMoneyBtn: HTMLButtonElement | undefined

  //   private _leftInterfaceBtn: HTMLButtonElement | undefined
  //   private _rightInterfaceBtn: HTMLButtonElement | undefined

  private _settingsHeading: HTMLHeadingElement | undefined
  private _languageHeading: HTMLHeadingElement | undefined
  private _soundEffectHeading: HTMLHeadingElement | undefined
  private _interfaceHeading: HTMLHeadingElement | undefined

  private _balanceLabel: HTMLLabelElement | undefined

  constructor() {
    //
    this._settingsHeading = document.getElementById(
      'settings-heading',
    ) as HTMLHeadingElement
    this._languageHeading = document.getElementById(
      'language-heading',
    ) as HTMLHeadingElement
    this._soundEffectHeading = document.getElementById(
      'sound-effect-heading',
    ) as HTMLHeadingElement
    this._interfaceHeading = document.getElementById(
      'interface-heading',
    ) as HTMLHeadingElement

    this._ruBtn = document.getElementById('ru-btn') as HTMLButtonElement
    this._enBtn = document.getElementById('en-btn') as HTMLButtonElement
    this._playForMoneyBtn = document.getElementById(
      'play-for-money-btn',
    ) as HTMLButtonElement

    this._balanceLabel = document.getElementById(
      'balance-label',
    ) as HTMLLabelElement
  }

  setLanguage(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._settingsHeading) {
          this._settingsHeading.textContent = 'Настройки'
        }
        if (this._languageHeading) {
          this._languageHeading.textContent = 'Язык'
        }
        if (this._soundEffectHeading) {
          this._soundEffectHeading.textContent = 'Звуки'
        }
        if (this._interfaceHeading) {
          this._interfaceHeading.textContent = 'Интерфейс'
        }
        if (this._ruBtn) {
          this._ruBtn.textContent = 'РУС'
        }
        if (this._enBtn) {
          this._enBtn.textContent = 'АНГ'
        }
        if (this._playForMoneyBtn) {
          this._playForMoneyBtn.textContent = 'Играть за деньги'
        }
        if (this._balanceLabel) {
          this._balanceLabel.textContent = 'Баланс'
        }
        this._ruBtn?.classList.remove('language-btn')
        this._ruBtn?.classList.add('language-btn-active')
        this._enBtn?.classList.remove('language-btn-active')
        this._enBtn?.classList.add('language-btn')
        break
      }
      case Language.EN: {
        if (this._settingsHeading) {
          this._settingsHeading.textContent = 'Settings'
        }
        if (this._languageHeading) {
          this._languageHeading.textContent = 'Language'
        }
        if (this._soundEffectHeading) {
          this._soundEffectHeading.textContent = 'Sound Effects'
        }
        if (this._interfaceHeading) {
          this._interfaceHeading.textContent = 'Interface'
        }
        if (this._ruBtn) {
          this._ruBtn.textContent = 'RU'
        }
        if (this._enBtn) {
          this._enBtn.textContent = 'EN'
        }
        if (this._playForMoneyBtn) {
          this._playForMoneyBtn.textContent = 'Play for money'
        }
        if (this._balanceLabel) {
          this._balanceLabel.textContent = 'Balance'
        }
        this._enBtn?.classList.remove('language-btn')
        this._enBtn?.classList.add('language-btn-active')
        this._ruBtn?.classList.remove('language-btn-active')
        this._ruBtn?.classList.add('language-btn')
        break
      }
    }
  }
}
