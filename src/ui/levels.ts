import { EventEmitter } from 'events'

export class Levels {
  private emitter: EventEmitter

  private nodeLevels: NodeListOf<Element>
  private _level: number

  constructor() {
    this.nodeLevels = document.querySelectorAll('.join button[data-level]')
    this._level = 8

    this.emitter = new EventEmitter()

    this.nodeLevels.forEach((btn) => {
      btn.addEventListener('click', async () => {
        this.removeAccent()
        btn.classList.remove('btn-secondary')
        btn.classList.add('btn-accent')
        if (btn instanceof HTMLElement) {
          this._level = +(btn.dataset.level || 8)
          this.dispatcher.emit('change', {})
        }
      })
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
