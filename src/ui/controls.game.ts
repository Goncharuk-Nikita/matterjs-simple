import { EventEmitter } from 'events'
import { Language, RiskMode } from '../types/settings'
import { ControlsStore } from '../store/controls.store'

export class GameControls {
  private emitter: EventEmitter

  private nodeLevels: NodeListOf<Element> | undefined
  private nodeRisks: NodeListOf<Element> | undefined
  private nodeAuto: NodeListOf<Element> | undefined
  private nodeSpeed: NodeListOf<Element> | undefined

  private _level: number
  private _playBtn: HTMLButtonElement
  private _levelDropdownBtn: HTMLButtonElement | undefined
  private _levelDropdown: HTMLDivElement | undefined
  private _levelBtnValue: HTMLSpanElement | undefined

  private _riskDropdown: HTMLDivElement | undefined
  private _riskDropdownBtn: HTMLButtonElement | undefined
  private _riskMode?: RiskMode
  private _riskBtnValue?: HTMLSpanElement
  private _riskBtnImg?: HTMLImageElement

  private _autoDropdown: HTMLDivElement | undefined
  private _autoDropdownBtn: HTMLButtonElement | undefined

  private _speedDropdown: HTMLDivElement | undefined
  private _speedDropdownBtn: HTMLButtonElement | undefined
  private _speedBtnValue?: HTMLSpanElement | undefined
  private _speed: number = 1

  private store: ControlsStore

  constructor() {
    this.store = new ControlsStore()

    this._level = 8
    this.emitter = new EventEmitter()

    this._playBtn = document.getElementById('play-btn') as HTMLButtonElement
    this._playBtn.addEventListener('click', () => {
      this.dispatcher.emit('play')
    })

    this.initLevelControls()
    this.initRiskControls()
    this.initAuto()
    this.initSpeed()
  }

  private initSpeed() {
    this._speedDropdown = document.getElementById(
      'speed-dropdown',
    ) as HTMLDivElement

    this._speedDropdownBtn = document.getElementById(
      'speed-btn',
    ) as HTMLButtonElement

    this._speedBtnValue = document.querySelector(
      '#speed-btn span',
    ) as HTMLSpanElement

    this._speedDropdownBtn.addEventListener('click', () => {
      //this.dispatcher.emit('changeLevel', {})
      this._speedDropdownBtn?.classList.remove('functional-btn')
      this._speedDropdownBtn?.classList.add('functional-btn-active')
      this._speedDropdown?.classList.add('flex')
      this._speedDropdown?.classList.remove('hidden')
    })

    this.nodeSpeed = document.querySelectorAll('button[data-speed]')
    this.nodeSpeed.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeSpeedAccent()
        btn.classList.remove('functional-btn')
        btn.classList.add('functional-btn-active')
        if (btn instanceof HTMLElement) {
          this._speed = +(btn.dataset.speed || 1)
          if (this._speedBtnValue) {
            this._speedBtnValue.textContent = this._speed.toString()
          }
          this.dispatcher.emit('changeSpeed')
        }

        this._speedDropdownBtn?.classList.add('functional-btn')
        this._speedDropdownBtn?.classList.remove('functional-btn-active')
        this._speedDropdown?.classList.remove('flex')
        this._speedDropdown?.classList.add('hidden')
      })
    })
  }

  private initAuto() {
    //console.log(this.nodeAuto)
    this._autoDropdown = document.getElementById(
      'auto-dropdown',
    ) as HTMLDivElement

    this._autoDropdownBtn = document.getElementById(
      'auto-btn',
    ) as HTMLButtonElement

    this._autoDropdownBtn.addEventListener('click', () => {
      //this.dispatcher.emit('changeLevel', {})
      this._autoDropdownBtn?.classList.remove('functional-btn')
      this._autoDropdownBtn?.classList.add('functional-btn-active')
      this._autoDropdown?.classList.add('flex')
      this._autoDropdown?.classList.remove('hidden')
    })

    this.nodeAuto = document.querySelectorAll('button[data-auto]')
    this.nodeAuto.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeAutoAccent()
        btn.classList.remove('functional-btn')
        btn.classList.add('functional-btn-active')

        while (this._autoDropdownBtn?.firstChild) {
          this._autoDropdownBtn.removeChild(this._autoDropdownBtn.firstChild)
        }

        if (btn instanceof HTMLElement) {
          //this._autoDropdownBtn.re

          const autoLabel = document.createElement('label')
          autoLabel.textContent =
            this.store.language === Language.RU ? 'Режим' : 'Mode'
          this._autoDropdownBtn?.appendChild(autoLabel)

          const auto = +(btn.dataset.auto || '0')

          if (auto) {
            const autoValue = document.createElement('div')
            autoValue.textContent = auto.toString()
            autoValue.classList.add('flex', 'flex-col', 'moves')
            this._autoDropdownBtn?.appendChild(autoValue)
            const autoValueSpan = document.createElement('span')
            autoValueSpan.textContent =
              this.store.language === Language.RU ? 'Броски' : 'Moves'
            autoValue.appendChild(autoValueSpan)

            const autoSpan = document.createElement('span')
            autoSpan.textContent =
              this.store.language === Language.RU ? 'Авто' : 'Auto'
            autoSpan.classList.add('auto')
            this._autoDropdownBtn?.appendChild(autoSpan)
          } else {
            const autoImg = document.createElement('img')
            autoImg.src = 'assets/png/thumbs-up-solid.png'
            this._autoDropdownBtn?.appendChild(autoImg)

            const autoSpan = document.createElement('span')
            autoSpan.textContent =
              this.store.language === Language.RU ? 'В ручную' : 'Manual'
            this._autoDropdownBtn?.appendChild(autoSpan)
          }
        }

        this._autoDropdownBtn?.classList.add('functional-btn')
        this._autoDropdownBtn?.classList.remove('functional-btn-active')
        this._autoDropdown?.classList.remove('flex')
        this._autoDropdown?.classList.add('hidden')
      })
      //
    })
  }

  private initLevelControls() {
    this.nodeLevels = document.querySelectorAll('button[data-level]')
    this.nodeLevels.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeLevelAccent()
        btn.classList.remove('functional-btn')
        btn.classList.add('functional-btn-active')
        if (btn instanceof HTMLElement) {
          this._level = +(btn.dataset.level || 8)
          if (this._levelBtnValue) {
            this._levelBtnValue.textContent = this._level.toString()
          }
          this.dispatcher.emit('changeLevel', {})
        }

        this._levelDropdownBtn?.classList.add('functional-btn')
        this._levelDropdownBtn?.classList.remove('functional-btn-active')
        this._levelDropdown?.classList.remove('flex')
        this._levelDropdown?.classList.add('hidden')
      })
    })

    this._levelDropdown = document.getElementById(
      'levels-dropdown',
    ) as HTMLDivElement
    this._levelDropdownBtn = document.getElementById(
      'level-btn',
    ) as HTMLButtonElement
    this._levelDropdownBtn.addEventListener('click', () => {
      //this.dispatcher.emit('changeLevel', {})
      this._levelDropdownBtn?.classList.remove('functional-btn')
      this._levelDropdownBtn?.classList.add('functional-btn-active')
      this._levelDropdown?.classList.add('flex')
      this._levelDropdown?.classList.remove('hidden')
    })
    this._levelBtnValue = document.querySelector(
      '#level-btn span',
    ) as HTMLSpanElement
  }

  private initRiskControls() {
    this._riskDropdown = document.getElementById(
      'risk-dropdown',
    ) as HTMLDivElement

    this._riskDropdownBtn = document.getElementById(
      'risk-btn',
    ) as HTMLButtonElement
    this._riskDropdownBtn.addEventListener('click', () => {
      //this.dispatcher.emit('changeLevel', {})
      this._riskDropdownBtn?.classList.remove('functional-btn')
      this._riskDropdownBtn?.classList.add('functional-btn-active')
      this._riskDropdown?.classList.add('flex')
      this._riskDropdown?.classList.remove('hidden')
    })

    this._riskBtnValue = document.querySelector(
      '#risk-btn span',
    ) as HTMLSpanElement

    this.nodeRisks = document.querySelectorAll('button[data-risk]')
    this.nodeRisks.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeRiskAccent()
        btn.classList.remove('functional-btn')
        btn.classList.add('functional-btn-active')
        if (btn instanceof HTMLElement) {
          const risk = btn.dataset.risk
          //console.log(risk)
          switch (risk) {
            case 'low':
              this._riskMode = RiskMode.LOW
              if (this._riskBtnImg) {
                this._riskBtnImg.src = 'assets/png/flame-solid-low.png'
              }
              break
            case 'medium':
              this._riskMode = RiskMode.MEDIUM
              if (this._riskBtnImg) {
                this._riskBtnImg.src = 'assets/png/flame-solid-medium.png'
              }
              break
            case 'high':
              this._riskMode = RiskMode.HIGH
              if (this._riskBtnImg) {
                this._riskBtnImg.src = 'assets/png/flame-solid-hard.png'
              }
              break
          }
          if (this._riskBtnValue) {
            this._riskBtnValue.textContent = this.getRiskLabel(risk || 'low')
          }
          this.dispatcher.emit('changeRisk', { risk: this._riskMode })
        }

        this._riskDropdownBtn?.classList.add('functional-btn')
        this._riskDropdownBtn?.classList.remove('functional-btn-active')
        this._riskDropdown?.classList.remove('flex')
        this._riskDropdown?.classList.add('hidden')
      })
    })

    this._riskMode = RiskMode.LOW

    this._riskBtnValue = document.querySelector(
      '#risk-btn span',
    ) as HTMLSpanElement

    this._riskBtnImg = document.querySelector(
      '#risk-btn img',
    ) as HTMLImageElement
  }

  private getRiskLabel(risk: string): string {
    switch (risk) {
      case 'low':
        return this.store.language === Language.RU ? 'Низкий' : 'Low'
      case 'medium':
        return this.store.language === Language.RU ? 'Средний' : 'Medium'
      case 'high':
        return this.store.language === Language.RU ? 'Высокий' : 'High'
      default:
        return this.store.language === Language.RU ? 'Низкий' : 'Low'
    }
    return ''
  }

  get level(): number {
    return this._level
  }

  get speed(): number {
    return this._speed
  }

  get dispatcher() {
    return this.emitter
  }

  private removeLevelAccent = () => {
    this.nodeLevels?.forEach((btn: Element) => {
      btn.classList.remove('functional-btn-active')
      btn.classList.add('functional-btn')
    })
  }
  private removeRiskAccent = () => {
    this.nodeRisks?.forEach((btn: Element) => {
      btn.classList.remove('functional-btn-active')
      btn.classList.add('functional-btn')
    })
  }
  private removeAutoAccent = () => {
    this.nodeAuto?.forEach((btn: Element) => {
      btn.classList.remove('functional-btn-active')
      btn.classList.add('functional-btn')
    })
  }
  private removeSpeedAccent = () => {
    this.nodeSpeed?.forEach((btn: Element) => {
      btn.classList.remove('functional-btn-active')
      btn.classList.add('functional-btn')
    })
  }
}
