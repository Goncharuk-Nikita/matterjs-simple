//import { EventEmitter } from 'events'

import { Language } from '../types/settings'

export class ResultsLocale {
  private _playForMoneyBtn: HTMLButtonElement | undefined

  private _balanceLabel: HTMLLabelElement | undefined

  private _timeLabel: HTMLLabelElement | undefined
  private _bidLabel: HTMLLabelElement | undefined
  private _winLabel: HTMLLabelElement | undefined
  private _scoreLabel: HTMLLabelElement | undefined

  constructor() {
    //
    this._playForMoneyBtn = document.getElementById(
      'play-for-money-btn',
    ) as HTMLButtonElement
    this._balanceLabel = document.getElementById(
      'balance-label',
    ) as HTMLLabelElement
    this._timeLabel = document.getElementById('time-label') as HTMLLabelElement
    this._bidLabel = document.getElementById('bid-label') as HTMLLabelElement
    this._winLabel = document.getElementById('win-label') as HTMLLabelElement
    this._scoreLabel = document.getElementById(
      'score-label',
    ) as HTMLLabelElement
  }

  setLanguage(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._playForMoneyBtn) {
          this._playForMoneyBtn.textContent = 'Играть за деньги'
        }
        if (this._balanceLabel) {
          this._balanceLabel.textContent = 'Баланс'
        }
        if (this._timeLabel) {
          this._timeLabel.textContent = 'Время'
        }
        if (this._bidLabel) {
          this._bidLabel.textContent = 'Ставка'
        }
        if (this._winLabel) {
          this._winLabel.textContent = 'Выигрыш'
        }
        if (this._scoreLabel) {
          this._scoreLabel.textContent = 'Счет'
        }
        break
      }
      case Language.EN: {
        if (this._playForMoneyBtn) {
          this._playForMoneyBtn.textContent = 'Play for money'
        }
        if (this._balanceLabel) {
          this._balanceLabel.textContent = 'Balance'
        }
        if (this._timeLabel) {
          this._timeLabel.textContent = 'Time'
        }
        if (this._bidLabel) {
          this._bidLabel.textContent = 'Bid'
        }
        if (this._winLabel) {
          this._winLabel.textContent = 'Win'
        }
        if (this._scoreLabel) {
          this._scoreLabel.textContent = 'Score'
        }
        break
      }
    }
  }
}
