import { ISettings } from '../types/settings'

export class Settings implements ISettings {
  timeScale = 1
  gravityScale = 0.001
  gravityX = 0
  gravityY = 1
  gap = 57
  spacing = 75
  pegRadius = 7.5
  pegFriction = 0.0
  pegRestitution = 0.3
  ballRadius = 23.5
  ballFriction = 0.0
  ballFrictionAir = 0.06
  ballSlop = 0
  ballRestitution = 0.5
  ballDensity = 0.01
  forceMagnitude = 0.3
  velocity = 0.003
  angularVelocity = 0.1

  constructor(settings: ISettings) {
    Object.assign(this, settings)
  }
}
