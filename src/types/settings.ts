export interface ISettings {
  /* engine settings */
  timeScale: number
  /* world settings */
  gravityScale: number
  gravityX: number
  gravityY: number
  /* field defaults */
  gap: number
  spacing: number
  pegRadius: number
  pegFriction: number
  pegRestitution: number
  /* ball defaults */
  ballRadius: number
  ballFriction: number
  ballRestitution: number
  ballDensity: number
  ballFrictionAir: number
  ballSlop: number
  /* hit manipulation defaults */
  forceMagnitude: number
  velocity: number
  angularVelocity: number
}
