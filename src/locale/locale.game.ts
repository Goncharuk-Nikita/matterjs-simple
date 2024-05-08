//import { EventEmitter } from 'events'

import { Language } from '../types/settings'

export class GameLocale {
  private _playForMoneyBtn: HTMLButtonElement | undefined
  private _balanceLabel: HTMLLabelElement | undefined
  private _playBtnSpan: HTMLSpanElement | undefined
  private _levelBtn: HTMLButtonElement | undefined
  private _levelBtnValue: HTMLSpanElement | undefined
  private _speedBtn: HTMLButtonElement | undefined
  private _speedBtnValue: HTMLSpanElement | undefined
  private _riskBtnValue: HTMLSpanElement | undefined

  private _riskLowValue: HTMLSpanElement | undefined
  private _riskMediumValue: HTMLSpanElement | undefined
  private _riskHighValue: HTMLSpanElement | undefined

  private _riskLabels: NodeListOf<Element> | undefined

  private _autoBtnValue: HTMLSpanElement | undefined
  private _autoBtnLabel: HTMLLabelElement | undefined

  private _autoLabels: NodeListOf<Element> | undefined
  private _autoMoves: NodeListOf<Element> | undefined
  private _autoNodes: NodeListOf<Element> | undefined
  private _autoSelectBtnValue: HTMLSpanElement | undefined

  constructor() {
    this._playForMoneyBtn = document.getElementById(
      'play-for-money-btn',
    ) as HTMLButtonElement

    this._balanceLabel = document.getElementById(
      'balance-label',
    ) as HTMLLabelElement

    const playBtn = document.getElementById('play-btn') as HTMLButtonElement
    this._playBtnSpan = playBtn.querySelector('span') as HTMLSpanElement

    this._levelBtn = document.getElementById('level-btn') as HTMLButtonElement
    this._levelBtnValue = document.querySelector(
      '#level-btn span',
    ) as HTMLSpanElement

    this._speedBtn = document.getElementById('speed-btn') as HTMLButtonElement
    this._speedBtnValue = document.querySelector(
      '#speed-btn span',
    ) as HTMLSpanElement

    this._riskBtnValue = document.querySelector(
      '#risk-btn span',
    ) as HTMLSpanElement

    this._riskLabels = document.querySelectorAll('.risk-label')

    this._riskLowValue = document.getElementById(
      'risk-low-span',
    ) as HTMLSpanElement
    this._riskMediumValue = document.getElementById(
      'risk-medium-span',
    ) as HTMLSpanElement
    this._riskHighValue = document.getElementById(
      'risk-high-span',
    ) as HTMLSpanElement

    this._autoBtnValue = document.querySelector(
      '#auto-btn span',
    ) as HTMLSpanElement

    this._autoBtnLabel = document.querySelector(
      '#auto-btn label',
    ) as HTMLLabelElement

    this._autoLabels = document.querySelectorAll('.auto-btn label')
    this._autoMoves = document.querySelectorAll('.moves span')
    this._autoNodes = document.querySelectorAll('.auto-btn span')

    this._autoSelectBtnValue = document.getElementById(
      'auto-btn-span',
    ) as HTMLSpanElement
  }

  setLanguage(locale: Language) {
    this.setPlayLocale(locale)
    this.setLevelLocale(locale)
    this.setSpeedLocale(locale)
    this.setRiskLocale(locale)
    this.setAutoLocale(locale)
  }

  private setPlayLocale(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._playForMoneyBtn) {
          this._playForMoneyBtn.textContent = 'Играть за деньги'
        }
        if (this._balanceLabel) {
          this._balanceLabel.textContent = 'Баланс'
        }
        if (this._playBtnSpan) {
          this._playBtnSpan.textContent = 'Играть'
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
        if (this._playBtnSpan) {
          this._playBtnSpan.textContent = 'Play'
        }
        break
      }
    }
  }

  private setLevelLocale(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._levelBtn) {
          this._levelBtn.textContent = 'уровень'
          this._levelBtnValue && this._levelBtn.appendChild(this._levelBtnValue)
        }
        break
      }
      case Language.EN: {
        if (this._levelBtn) {
          this._levelBtn.textContent = 'level'
          this._levelBtnValue && this._levelBtn.appendChild(this._levelBtnValue)
        }
        break
      }
    }
  }

  private setSpeedLocale(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._speedBtn) {
          this._speedBtn.textContent = 'скорость'
          this._speedBtnValue && this._speedBtn.appendChild(this._speedBtnValue)
        }
        break
      }
      case Language.EN: {
        if (this._speedBtn) {
          this._speedBtn.textContent = 'speed'
          this._speedBtnValue && this._speedBtn.appendChild(this._speedBtnValue)
        }
        break
      }
    }
  }

  private setRiskLocale(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._riskBtnValue) {
          if (
            this._riskBtnValue.textContent?.toUpperCase() == 'LOW' ||
            this._riskBtnValue.textContent?.toUpperCase() == 'НИЗКИЙ'
          ) {
            this._riskBtnValue.textContent = 'Низкий'
          } else if (
            this._riskBtnValue.textContent?.toUpperCase() == 'MEDIUM' ||
            this._riskBtnValue.textContent?.toUpperCase() == 'СРЕДНИЙ'
          ) {
            this._riskBtnValue.textContent = 'Средний'
          } else if (
            this._riskBtnValue.textContent?.toUpperCase() == 'HIGH' ||
            this._riskBtnValue.textContent?.toUpperCase() == 'ВЫСОКИЙ'
          ) {
            this._riskBtnValue.textContent = 'Высокий'
          }
        }
        this._riskLabels?.forEach((label) => {
          label.textContent = 'Риск'
        })
        if (this._riskLowValue) {
          this._riskLowValue.textContent = 'Низкий'
        }
        if (this._riskMediumValue) {
          this._riskMediumValue.textContent = 'Средний'
        }
        if (this._riskHighValue) {
          this._riskHighValue.textContent = 'Высокий'
        }
        break
      }
      case Language.EN: {
        if (this._riskBtnValue) {
          if (
            this._riskBtnValue.textContent?.toUpperCase() == 'LOW' ||
            this._riskBtnValue.textContent?.toUpperCase() == 'НИЗКИЙ'
          ) {
            this._riskBtnValue.textContent = 'Low'
          } else if (
            this._riskBtnValue.textContent?.toUpperCase() == 'MEDIUM' ||
            this._riskBtnValue.textContent?.toUpperCase() == 'СРЕДНИЙ'
          ) {
            this._riskBtnValue.textContent = 'Medium'
          } else if (
            this._riskBtnValue.textContent?.toUpperCase() == 'HIGH' ||
            this._riskBtnValue.textContent?.toUpperCase() == 'ВЫСОКИЙ'
          ) {
            this._riskBtnValue.textContent = 'High'
          }
        }
        this._riskLabels?.forEach((label) => {
          label.textContent = 'Risk level'
        })
        if (this._riskLowValue) {
          this._riskLowValue.textContent = 'Low'
        }
        if (this._riskMediumValue) {
          this._riskMediumValue.textContent = 'Medium'
        }
        if (this._riskHighValue) {
          this._riskHighValue.textContent = 'High'
        }
        break
      }
    }
  }

  private setAutoLocale(locale: Language) {
    switch (locale) {
      case Language.RU: {
        if (this._autoBtnValue) {
          this._autoBtnValue.textContent = 'В ручную'
        }
        if (this._autoBtnLabel) {
          this._autoBtnLabel.textContent = 'Режим'
        }
        if (this._autoLabels) {
          this._autoLabels.forEach((label) => {
            label.textContent = 'Режим'
          })
        }
        if (this._autoMoves) {
          this._autoMoves.forEach((moves) => {
            moves.textContent = 'Бросков'
          })
        }
        if (this._autoNodes) {
          this._autoNodes.forEach((node) => {
            node.textContent = 'Авто'
          })
        }
        if (this._autoSelectBtnValue) {
          this._autoSelectBtnValue.textContent = 'В ручную'
        }
        break
      }
      case Language.EN: {
        if (this._autoBtnValue) {
          this._autoBtnValue.textContent = 'Manual'
        }
        if (this._autoBtnLabel) {
          this._autoBtnLabel.textContent = 'Mode'
        }
        if (this._autoLabels) {
          this._autoLabels.forEach((label) => {
            label.textContent = 'Mode'
          })
        }
        if (this._autoMoves) {
          this._autoMoves.forEach((moves) => {
            moves.textContent = 'Moves'
          })
        }
        if (this._autoNodes) {
          this._autoNodes.forEach((node) => {
            node.textContent = 'Auto'
          })
        }
        if (this._autoSelectBtnValue) {
          this._autoSelectBtnValue.textContent = 'Manual'
        }
        break
      }
    }
  }
}
