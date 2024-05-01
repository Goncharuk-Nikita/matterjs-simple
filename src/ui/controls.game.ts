import { EventEmitter } from 'events'
import { RiskMode } from '../types/settings'

export class GameControls {
  private emitter: EventEmitter

  private nodeLevels: NodeListOf<Element> | undefined
  private nodeRisks: NodeListOf<Element> | undefined

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

  constructor() {
    this._level = 8
    this.emitter = new EventEmitter()

    this._playBtn = document.getElementById('play-btn') as HTMLButtonElement
    this._playBtn.addEventListener('click', () => {
      this.dispatcher.emit('play')
    })

    this.initLevelControls()
    this.initRiskControls()
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
            case 'hard':
              this._riskMode = RiskMode.HARD
              if (this._riskBtnImg) {
                this._riskBtnImg.src = 'assets/png/flame-solid-hard.png'
              }
              break
          }
          if (this._riskBtnValue) {
            this._riskBtnValue.textContent = risk?.toUpperCase() || 'LOW'
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

  get level(): number {
    return this._level
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
}
