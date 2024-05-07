import { SettingsControls } from './ui/controls.settings'

let controls: SettingsControls

function run() {
  controls = new SettingsControls()
  controls.dispatcher.addListener('language', () => {
    //location.reload()
    console.log(controls.language)
  })

  controls.dispatcher.addListener('volume', () => {
    console.log(controls.volume)
  })

  controls.dispatcher.addListener('fx', () => {
    console.log(controls.fx)
  })

  controls.dispatcher.addListener('interface', () => {
    console.log(controls.interface)
  })
}
run()
