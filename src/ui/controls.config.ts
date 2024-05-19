import { EventEmitter } from 'events'
import { Store } from '../store/game.store'

import { CanvasMode } from '../types/settings'

export class ConfigControls {
  private emitter: EventEmitter

  private _tabs: NodeListOf<HTMLElement>
  private _tabsContents: NodeListOf<HTMLElement>
  private _store: Store

  private gapInput?: HTMLInputElement
  private spacingInput?: HTMLInputElement

  private ballRadiusInput?: HTMLInputElement
  private ballFrictionInput?: HTMLInputElement
  private ballRestitutionInput?: HTMLInputElement
  private ballDensityInput?: HTMLInputElement
  private ballFrictionAirInput?: HTMLInputElement
  private ballSlopInput?: HTMLInputElement

  private pegRadiusInput?: HTMLInputElement
  private pegFrictionInput?: HTMLInputElement
  private pegRestitutionInput?: HTMLInputElement

  private timeScaleInput?: HTMLInputElement

  private gravityScaleInput?: HTMLInputElement
  private gravityXInput?: HTMLInputElement
  private gravityYInput?: HTMLInputElement

  private forceMagnitudeInput?: HTMLInputElement
  private velocityInput?: HTMLInputElement
  private angularVelocityInput?: HTMLInputElement

  private _canvasMode: CanvasMode
  private _level: number

  constructor(store: Store) {
    this._store = store

    this._canvasMode = CanvasMode.LG
    this._level = 8

    /* init tabs */
    this._tabsContents = document.querySelectorAll('.tab-content')
    this._tabs = document.querySelectorAll('.tab')
    this._tabs.forEach((tab: HTMLElement) => {
      tab.addEventListener('click', async () => {
        this.clearTabs()
        this.clearTabsContents()
        tab.classList.add('tab-active')
        const tabIndex = +(tab.dataset.tab || 0)
        const content = this._tabsContents[tabIndex]
        content.classList.remove('hidden')
        content.classList.add('block')
        console.log(content)
      })
    })

    /* init inputs */
    this.initInputs()
    this.initListeners()

    this.emitter = new EventEmitter()
  }

  setValues(canvasMode: CanvasMode, level: number) {
    //
    this._canvasMode = canvasMode
    this._level = level

    const settings = this._store.getSettings(canvasMode, level)

    // game
    if (this.timeScaleInput) {
      this.timeScaleInput.value = `${settings?.timeScale}`
    }
    // world
    if (this.gravityScaleInput) {
      this.gravityScaleInput.value = `${settings?.gravityScale}`
    }
    if (this.gravityXInput) {
      this.gravityXInput.value = `${settings?.gravityX}`
    }
    if (this.gravityYInput) {
      this.gravityYInput.value = `${settings?.gravityY}`
    }
    // field
    if (this.gapInput) {
      this.gapInput.value = `${settings?.gap}`
    }
    if (this.spacingInput) {
      this.spacingInput.value = `${settings?.spacing}`
    }
    // peg
    if (this.pegRadiusInput) {
      this.pegRadiusInput.value = `${settings?.pegRadius}`
    }
    if (this.pegFrictionInput) {
      this.pegFrictionInput.value = `${settings?.pegFriction}`
    }
    if (this.pegRestitutionInput) {
      this.pegRestitutionInput.value = `${settings?.pegRestitution}`
    }
    // ball
    if (this.ballRadiusInput) {
      this.ballRadiusInput.value = `${settings?.ballRadius}`
    }
    if (this.ballFrictionInput) {
      this.ballFrictionInput.value = `${settings?.ballFriction}`
    }
    if (this.ballRestitutionInput) {
      this.ballRestitutionInput.value = `${settings?.ballRestitution}`
    }
    if (this.ballFrictionAirInput) {
      this.ballFrictionAirInput.value = `${settings?.ballFrictionAir}`
    }
    if (this.ballSlopInput) {
      this.ballSlopInput.value = `${settings?.ballSlop}`
    }
    if (this.ballDensityInput) {
      this.ballDensityInput.value = `${settings?.ballDensity}`
    }
    // collision
    if (this.forceMagnitudeInput) {
      this.forceMagnitudeInput.value = `${settings?.forceMagnitude}`
    }
    if (this.velocityInput) {
      this.velocityInput.value = `${settings?.velocity}`
    }
    if (this.angularVelocityInput) {
      this.angularVelocityInput.value = `${settings?.angularVelocity}`
    }
  }

  get dispatcher() {
    return this.emitter
  }

  private initListeners() {
    if (this.timeScaleInput) {
      this.timeScaleInput.addEventListener('input', () => {
        const value = this.timeScaleInput?.value || 0
        this._store.setTimeScale(this._canvasMode, this._level, +value)
        this.dispatcher.emit('speed')
      })
    }
    // world
    if (this.gravityScaleInput) {
      this.gravityScaleInput.addEventListener('input', () => {
        const value = this.gravityScaleInput?.value || 0
        this._store.setGravityScale(this._canvasMode, this._level, +value)
        this.dispatcher.emit('world')
      })
    }
    if (this.gravityXInput) {
      this.gravityXInput.addEventListener('input', () => {
        const value = this.gravityXInput?.value || 0
        this._store.setGravityX(this._canvasMode, this._level, +value)
        this.dispatcher.emit('world')
      })
    }
    if (this.gravityYInput) {
      this.gravityYInput.addEventListener('input', () => {
        const value = this.gravityYInput?.value || 0
        this._store.setGravityY(this._canvasMode, this._level, +value)
        this.dispatcher.emit('world')
      })
    }
    // field
    if (this.gapInput) {
      this.gapInput.addEventListener('input', () => {
        const value = this.gapInput?.value || 0
        this._store.setGap(this._canvasMode, this._level, +value)
        this.dispatcher.emit('field')
      })
    }
    if (this.spacingInput) {
      this.spacingInput.addEventListener('input', () => {
        const value = this.spacingInput?.value || 0
        this._store.setSpacing(this._canvasMode, this._level, +value)
        this.dispatcher.emit('field')
      })
    }
    // peg
    if (this.pegRadiusInput) {
      this.pegRadiusInput.addEventListener('input', () => {
        const value = this.pegRadiusInput?.value || 0
        this._store.setPegRadius(this._canvasMode, this._level, +value)
        this.dispatcher.emit('field')
      })
    }
    if (this.pegFrictionInput) {
      this.pegFrictionInput.addEventListener('input', () => {
        const value = this.gapInput?.value || 0
        this._store.setPegFriction(this._canvasMode, this._level, +value)
        this.dispatcher.emit('field')
      })
    }
    if (this.pegRestitutionInput) {
      this.pegRestitutionInput.addEventListener('input', () => {
        const value = this.gapInput?.value || 0
        this._store.setPegRestitution(this._canvasMode, this._level, +value)
        this.dispatcher.emit('field')
      })
    }
    // ball
    if (this.ballRadiusInput) {
      this.ballRadiusInput.addEventListener('input', () => {
        const value = this.ballRadiusInput?.value || 0
        this._store.setBallRadius(this._canvasMode, this._level, +value)
      })
    }
    if (this.ballFrictionInput) {
      this.ballFrictionInput.addEventListener('input', () => {
        const value = this.ballFrictionInput?.value || 0
        this._store.setBallFriction(this._canvasMode, this._level, +value)
      })
    }
    if (this.ballRestitutionInput) {
      this.ballRestitutionInput.addEventListener('input', () => {
        const value = this.ballRestitutionInput?.value || 0
        this._store.setBallRestitution(this._canvasMode, this._level, +value)
      })
    }
    if (this.ballFrictionAirInput) {
      this.ballFrictionAirInput.addEventListener('input', () => {
        const value = this.ballFrictionAirInput?.value || 0
        this._store.setBallFrictionAir(this._canvasMode, this._level, +value)
      })
    }
    if (this.ballSlopInput) {
      this.ballSlopInput.addEventListener('input', () => {
        const value = this.ballSlopInput?.value || 0
        this._store.setBallSlop(this._canvasMode, this._level, +value)
      })
    }
    if (this.ballDensityInput) {
      this.ballDensityInput.addEventListener('input', () => {
        const value = this.ballDensityInput?.value || 0
        this._store.setBallDensity(this._canvasMode, this._level, +value)
      })
    }
    // collision
    if (this.forceMagnitudeInput) {
      this.forceMagnitudeInput.addEventListener('input', () => {
        const value = this.forceMagnitudeInput?.value || 0
        this._store.setForceMagnitude(this._canvasMode, this._level, +value)
      })
    }
    if (this.velocityInput) {
      this.velocityInput.addEventListener('input', () => {
        const value = this.velocityInput?.value || 0
        this._store.setVelocity(this._canvasMode, this._level, +value)
      })
    }
    if (this.angularVelocityInput) {
      this.angularVelocityInput.addEventListener('input', () => {
        const value = this.angularVelocityInput?.value || 0
        this._store.setAngularVelocity(this._canvasMode, this._level, +value)
      })
      //this.angularVelocityInput.value = `${settings?.angularVelocity}`
    }
  }

  private initInputs = () => {
    // game
    this.timeScaleInput = document.getElementById(
      'time-scale-input',
    ) as HTMLInputElement

    // world
    this.gravityScaleInput = document.getElementById(
      'gravity-scale-input',
    ) as HTMLInputElement
    this.gravityXInput = document.getElementById(
      'gravity-x-input',
    ) as HTMLInputElement
    this.gravityYInput = document.getElementById(
      'gravity-y-input',
    ) as HTMLInputElement

    // field
    this.gapInput = document.getElementById('gap-input') as HTMLInputElement
    this.spacingInput = document.getElementById(
      'spacing-input',
    ) as HTMLInputElement

    // peg
    this.pegRadiusInput = document.getElementById(
      'peg-radius-input',
    ) as HTMLInputElement
    this.pegFrictionInput = document.getElementById(
      'peg-friction-input',
    ) as HTMLInputElement
    this.pegRestitutionInput = document.getElementById(
      'peg-restitution-input',
    ) as HTMLInputElement

    // ball
    this.ballRadiusInput = document.getElementById(
      'ball-radius-input',
    ) as HTMLInputElement
    this.ballFrictionInput = document.getElementById(
      'ball-friction-input',
    ) as HTMLInputElement
    this.ballRestitutionInput = document.getElementById(
      'ball-restitution-input',
    ) as HTMLInputElement
    this.ballDensityInput = document.getElementById(
      'ball-density-input',
    ) as HTMLInputElement
    this.ballFrictionAirInput = document.getElementById(
      'ball-friction-air-input',
    ) as HTMLInputElement
    this.ballSlopInput = document.getElementById(
      'ball-slop-input',
    ) as HTMLInputElement

    // collision
    this.forceMagnitudeInput = document.getElementById(
      'force-magnitude-input',
    ) as HTMLInputElement
    this.velocityInput = document.getElementById(
      'velocity-input',
    ) as HTMLInputElement
    this.angularVelocityInput = document.getElementById(
      'angular-velocity-input',
    ) as HTMLInputElement

    //this.logInputs()
  }

  private clearTabs = () => {
    this._tabs.forEach((tab: Element) => {
      tab.classList.remove('tab-active')
    })
  }

  private clearTabsContents = () => {
    this._tabsContents.forEach((content: Element) => {
      content.classList.add('hidden')
    })
  }

  // private logInputs() {
  //   // graphics
  //   console.log(this.timeScaleInput)
  //   console.log(this.gravityScaleInput)
  //   console.log(this.gravityXInput)
  //   console.log(this.gravityYInput)
  //   console.log(this.gapInput)
  //   console.log(this.spacingInput)
  //   console.log(this.pegRadiusInput)
  //   console.log(this.pegFrictionInput)
  //   console.log(this.pegRestitutionInput)
  //   console.log(this.ballRadiusInput)
  //   console.log(this.ballFrictionInput)
  //   console.log(this.ballRestitutionInput)
  //   console.log(this.ballDensityInput)
  //   console.log(this.ballFrictionAirInput)
  //   console.log(this.ballSlopInput)
  //   console.log(this.forceMagnitudeInput)
  //   console.log(this.velocityInput)
  //   console.log(this.angularVelocityInput)
  // }
}
