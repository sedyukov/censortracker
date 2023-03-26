import Browser from 'Background/browser-api'

import { synchronize } from '../background/server'

(async () => {
  const enableVolunteerNodeCheckbox = document.querySelector('#enableVolunteerNodeCheckbox')
  const saveEndpointButton = document.querySelector('#saveEndpointButton')
  const endpointInput = document.querySelector('#endpointInput')

  const { peerEndpoint, isPeerConnected } = await Browser.storage.local.get({
    peerEndpoint: '',
    isPeerConnected: false,
  })

  if (peerEndpoint) {
    endpointInput.value = peerEndpoint
  }

  enableVolunteerNodeCheckbox.checked = isPeerConnected

  enableVolunteerNodeCheckbox.addEventListener('change', async (event) => {
    const isPeerConnectedChecked = event.target.checked

    await Browser.storage.local.set({ isPeerConnected: isPeerConnectedChecked })

    await synchronize()
  }, false)

  saveEndpointButton.addEventListener('click', async (event) => {
    const peerEndpointValue = endpointInput.value

    if (peerEndpointValue) {
      await Browser.storage.local.set({
        peerEndpoint: peerEndpointValue,
      })

      endpointInput.classList.remove('invalid-input')

      console.log(`Peer endpoint changed to: ${peerEndpointValue}`)
      await synchronize()
    } else {
      endpointInput.classList.add('invalid-input')
    }
  })
})()
