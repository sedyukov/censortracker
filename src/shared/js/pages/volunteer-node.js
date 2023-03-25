import Browser from 'Background/browser-api'
import { initVolunteereNode } from 'Background/volunteer-service'

(async () => {
  const enableVolunteerNodeCheckbox = document.querySelector('#enableVolunteerNodeCheckbox')

  enableVolunteerNodeCheckbox.addEventListener('change', async (event) => {
    const enableNode = event.target.checked

    if (enableNode) {
      initVolunteereNode()
      console.log('enable node')
    } else {
      console.log('disable node')
    }

    await Browser.storage.local.set({ enableNode })
  }, false)
})()
