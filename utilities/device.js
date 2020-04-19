const fetch = require('node-fetch')

const urls = {
  getDeviceStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/device_status/'
}


function getDeviceStatus(access_token) {
  return new Promise((resolve, reject) => {
    if (!access_token || access_token.length === 0) {
      reject('Please call getAccessToken to get your access token first')
    }

    return fetch(urls.getDeviceStatus, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + access_token,
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(json => {
        deviceState = json.data
        resolve(deviceState)
      })
  })
}

module.exports = {
  getDeviceStatus
}