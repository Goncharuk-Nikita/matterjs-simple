import { EventEmitter } from 'events'
import { InterfaceSide, Language } from '../types/settings'

export class SettingsControls {
  private _emitter: EventEmitter

  private _ruBtn: HTMLButtonElement | undefined
  private _enBtn: HTMLButtonElement | undefined

  private _nodeVolumes: NodeListOf<Element> | undefined
  private _nodeFX: NodeListOf<Element> | undefined

  private _language: Language
  private _volume: number
  private _fx: number

  private _leftInterfaceBtn: HTMLButtonElement | undefined
  private _rightInterfaceBtn: HTMLButtonElement | undefined

  private _leftInterfaceImg: HTMLImageElement | undefined
  private _rightInterfaceImg: HTMLImageElement | undefined

  private _interfaceSide: InterfaceSide

  constructor() {
    this._emitter = new EventEmitter()
    this._language = Language.EN
    this._volume = 1
    this._fx = 1

    this._ruBtn = document.getElementById('ru-btn') as HTMLButtonElement
    this._ruBtn.addEventListener('click', () => {
      this._ruBtn?.classList.remove('language-btn')
      this._ruBtn?.classList.add('language-btn-active')
      this._enBtn?.classList.remove('language-btn-active')
      this._enBtn?.classList.add('language-btn')
      this._language = Language.RU
      this.dispatcher.emit('language')
    })

    this._enBtn = document.getElementById('en-btn') as HTMLButtonElement
    this._enBtn.addEventListener('click', () => {
      this._enBtn?.classList.remove('language-btn')
      this._enBtn?.classList.add('language-btn-active')
      this._ruBtn?.classList.remove('language-btn-active')
      this._ruBtn?.classList.add('language-btn')
      this._language = Language.EN
      this.dispatcher.emit('language')
    })

    this._nodeVolumes = document.querySelectorAll('.volume')
    this._nodeVolumes.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        const volume = btn.dataset['volume'] || 0
        btn.addEventListener('click', () => {
          this.recolorVolumes(+volume)
          this._volume = +volume
          this.dispatcher.emit('volume')
        })
      }
    })

    this._nodeFX = document.querySelectorAll('.fx')
    this._nodeFX.forEach((btn) => {
      if (btn instanceof HTMLElement) {
        const fx = btn.dataset['fx'] || 0
        btn.addEventListener('click', () => {
          this.recolorFX(+fx)
          this._fx = +fx
          this.dispatcher.emit('fx')
        })
      }
    })

    this.recolorVolumes(this._volume)
    this.recolorFX(this._fx)

    this._leftInterfaceBtn = document.getElementById(
      'left-interface-btn',
    ) as HTMLButtonElement
    this._rightInterfaceBtn = document.getElementById(
      'right-interface-btn',
    ) as HTMLButtonElement

    if (this._leftInterfaceBtn) {
      this._leftInterfaceImg = this._leftInterfaceBtn
        .firstChild as HTMLImageElement
      this._leftInterfaceBtn.addEventListener('click', () => {
        this._interfaceSide = InterfaceSide.LEFT
        if (this._leftInterfaceImg) {
          this._leftInterfaceImg.src = 'assets/png/LeftHandActive.png'
        }
        if (this._rightInterfaceImg) {
          this._rightInterfaceImg.src = 'assets/png/RightHand.png'
        }
        this.dispatcher.emit('interface')
      })
    }

    if (this._rightInterfaceBtn) {
      this._rightInterfaceImg = this._rightInterfaceBtn
        .firstChild as HTMLImageElement
      this._rightInterfaceBtn.addEventListener('click', () => {
        this._interfaceSide = InterfaceSide.RIGHT
        if (this._rightInterfaceImg) {
          this._rightInterfaceImg.src = 'assets/png/RightHandActive.png'
        }
        if (this._leftInterfaceImg) {
          this._leftInterfaceImg.src = 'assets/png/LeftHand.png'
        }
        this.dispatcher.emit('interface')
      })
    }

    this._interfaceSide = InterfaceSide.LEFT
  }

  private recolorVolumes = (volume: number) => {
    if (!this._nodeVolumes) return
    for (let i = 0; i < this._nodeVolumes.length; i++) {
      const btn = this._nodeVolumes[i]
      btn.classList.remove('effects-btn-active')
      btn.classList.remove('effects-btn')
      if (volume < i) {
        btn.classList.add('effects-btn')
      } else {
        btn.classList.add('effects-btn-active')
      }
    }
  }

  private recolorFX = (volume: number) => {
    if (!this._nodeFX) return
    for (let i = 0; i < this._nodeFX.length; i++) {
      const btn = this._nodeFX[i]
      btn.classList.remove('effects-btn-active', 'effects-btn')
      if (volume < i) {
        btn.classList.add('effects-btn')
      } else {
        btn.classList.add('effects-btn-active')
      }
    }
  }

  get dispatcher() {
    return this._emitter
  }

  get language() {
    return this._language
  }

  get volume() {
    return this._volume
  }

  get fx() {
    return this._fx
  }

  get interface() {
    return this._interfaceSide
  }
}
