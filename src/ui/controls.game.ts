import { EventEmitter } from 'events'

export class GameControls {
  private emitter: EventEmitter

  private nodeLevels: NodeListOf<Element>
  private _level: number
  private _playBtn: HTMLButtonElement
  private _levelDropdownBtn: HTMLButtonElement
  private _levelDropdown: HTMLDivElement
  private _levelBtnValue: HTMLSpanElement

  constructor() {
    this._level = 8
    this.emitter = new EventEmitter()

    this._playBtn = document.getElementById('play-btn') as HTMLButtonElement
    this._playBtn.addEventListener('click', () => {
      this.dispatcher.emit('play')
    })

    this.nodeLevels = document.querySelectorAll('button[data-level]')
    this.nodeLevels.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeAccent()
        btn.classList.remove('functional-btn')
        btn.classList.add('functional-btn-active')
        if (btn instanceof HTMLElement) {
          this._level = +(btn.dataset.level || 8)
          this._levelBtnValue.textContent = this._level.toString()
          this.dispatcher.emit('changeLevel', {})
        }

        this._levelDropdownBtn.classList.add('functional-btn')
        this._levelDropdownBtn.classList.remove('functional-btn-active')
        this._levelDropdown.classList.remove('flex')
        this._levelDropdown.classList.add('hidden')
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
      this._levelDropdownBtn.classList.remove('functional-btn')
      this._levelDropdownBtn.classList.add('functional-btn-active')
      this._levelDropdown.classList.add('flex')
      this._levelDropdown.classList.remove('hidden')
    })
    this._levelBtnValue = document.querySelector(
      '#level-btn span',
    ) as HTMLSpanElement
  }

  get level(): number {
    return this._level
  }

  get dispatcher() {
    return this.emitter
  }

  private removeAccent = () => {
    this.nodeLevels.forEach((btn: Element) => {
      btn.classList.remove('functional-btn-active')
      btn.classList.add('functional-btn')
    })
  }
}
