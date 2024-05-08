import { SettingsLocale } from './locale/locale.settings'
import { SettingsControls } from './ui/controls.settings'
import { SettingsStore } from './store/settings.store'

let controls: SettingsControls
let locale: SettingsLocale
let store: SettingsStore

function run() {
  store = new SettingsStore()
  locale = new SettingsLocale()
  locale.setLanguage(store.language)

  controls = new SettingsControls()
  controls.dispatcher.addListener('language', () => {
    //location.reload()
    console.log(controls.language)
    locale.setLanguage(controls.language)
    store.language = controls.language
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
