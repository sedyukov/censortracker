import * as storage from './storage'
import Browser from './webextension'

class Settings {
  getName () {
    return 'Censor Tracker'
  }

  getDangerIcon () {
    return Browser.runtime.getURL('images/icons/128x128/danger.png')
  }

  changePageIcon (tabId, filename) {
    const title = this.getName()
    const path = Browser.runtime.getURL(`images/icons/128x128/${filename}.png`)

    if (Browser.IS_FIREFOX) {
      Browser.browserAction.setIcon({ tabId, path })
      Browser.browserAction.setTitle({ title, tabId })
    } else {
      Browser.action.setIcon({ tabId, path })
      Browser.action.setTitle({ title, tabId })
    }
  }

  async showInstalledPage (tabId) {
    await Browser.tabs.create({ url: 'installed.html' })
  }

  setDisableIcon (tabId) {
    this.changePageIcon(tabId, 'disabled')
  }

  setDefaultIcon (tabId) {
    this.changePageIcon(tabId, 'default')
  }

  setDangerIcon (tabId) {
    this.changePageIcon(tabId, 'danger')
  }

  setBlockedIcon (tabId) {
    this.changePageIcon(tabId, 'blocked')
  }

  async extensionEnabled () {
    const { enableExtension } = await storage.get({ enableExtension: false })

    return enableExtension
  }

  async enableExtension () {
    await storage.set({ enableExtension: true })
    console.log('Settings.enableExtension()')
  }

  async disableExtension () {
    await storage.set({
      useProxy: false,
      enableExtension: false,
      showNotifications: false,
      parentalControl: false,
    })

    if (Browser.IS_FIREFOX) {
      await Browser.browserAction.setBadgeText({ text: '' })
    }

    console.log('Settings.disableExtension()')
  }

  async enableNotifications () {
    await storage.set({ showNotifications: true })
  }

  async disableNotifications () {
    await storage.set({ showNotifications: false })
  }

  async enableParentalControl () {
    await storage.set({ parentalControl: true })
  }

  async disableParentalControl () {
    await storage.set({ parentalControl: false })
  }
}

export default new Settings()
