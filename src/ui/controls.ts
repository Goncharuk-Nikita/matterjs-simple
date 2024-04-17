import { EventEmitter } from 'events'

export class Controls {
  private emitter: EventEmitter

  private nodeLevels: NodeListOf<Element>
  private _level: number
  private _playBtn: HTMLButtonElement
  private _saveBtn: HTMLButtonElement

  constructor() {
    this.nodeLevels = document.querySelectorAll('.join button[data-level]')
    this._level = 8

    this._playBtn = document.getElementById('play-btn') as HTMLButtonElement
    this._saveBtn = document.getElementById('save-btn') as HTMLButtonElement
    this.emitter = new EventEmitter()

    this.nodeLevels.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeAccent()
        btn.classList.remove('btn-secondary')
        btn.classList.add('btn-accent')
        if (btn instanceof HTMLElement) {
          this._level = +(btn.dataset.level || 8)
          this.dispatcher.emit('changeLevel', {})
        }
      })
    })

    this._playBtn.addEventListener('click', () => {
      this.dispatcher.emit('play')
    })
    this._saveBtn.addEventListener('click', () => {
      this.dispatcher.emit('save')
    })
  }

  get level(): number {
    return this._level
  }

  get dispatcher() {
    return this.emitter
  }

  private removeAccent = () => {
    this.nodeLevels.forEach((btn: Element) => {
      btn.classList.remove('btn-accent')
      btn.classList.add('btn-secondary')
    })
  }
}
