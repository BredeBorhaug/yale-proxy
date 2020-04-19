const fetch = require('node-fetch')


const urls = {
  getAlarmStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/mode/',
  setAlarmStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/mode/',
  services: 'https://mob.yalehomesystem.co.uk/yapi/services/',
  getDeviceStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/device_status/'
}


function setAlarmStatus(access_token, alarmstate) {
  return new Promise((resolve, reject) => {
    if (!access_token || access_token.length === 0) {
      reject('Please call getAccessToken to get your access token first')
    }

    if (alarmstate !== 'arm' && alarmstate !== 'home' && alarmstate !== 'disarm') {
      reject('Invalid mode passed to setStatus')
    }

    return fetch(urls.setAlarmStatus, {
      method: 'POST',
      body: `area=1&mode=${alarmstate}`,
      headers: {
        "Authorization": "Bearer " + access_token,
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(res => res.json())
      .then(json => {
        setStatus = json.data.cmd_ack
        resolve(setStatus)
      })
  })
}


function getAlarmStatus (access_token) {
  return new Promise((resolve, reject) => {
      if (!access_token || access_token.length === 0) {
          reject('Please call getAccessToken to get your access token first')
      };

      return fetch(urls.getAlarmStatus, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + access_token,
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      .then(res => res.json())
      .then(json => {
          alarmState = json.data[0].mode
          resolve(alarmState)
        })
    })
}

module.exports = {
  setAlarmStatus,
  getAlarmStatus
}