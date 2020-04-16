const fetch = require('node-fetch')


const yaleAuthToken = 'VnVWWDZYVjlXSUNzVHJhcUVpdVNCUHBwZ3ZPakxUeXNsRU1LUHBjdTpkd3RPbE15WEtENUJ5ZW1GWHV0am55eGhrc0U3V0ZFY2p0dFcyOXRaSWNuWHlSWHFsWVBEZ1BSZE1xczF4R3VwVTlxa1o4UE5ubGlQanY5Z2hBZFFtMHpsM0h4V3dlS0ZBcGZzakpMcW1GMm1HR1lXRlpad01MRkw3MGR0bmNndQ==';

let refresh_token = ''
let access_token = ''

const urls = {
  auth: 'https://mob.yalehomesystem.co.uk/yapi/o/token/',
  getAlarmStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/mode/',
  setStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/mode/',
  services: 'https://mob.yalehomesystem.co.uk/yapi/services/',
  getDeviceStatus: 'https://mob.yalehomesystem.co.uk/yapi/api/panel/device_status/'
}

function getAccessToken(username, password) {
  payload = `grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  return fetch(urls.auth, {
    method: 'POST',
    body: payload,
    headers: {
      "Authorization": "Basic " + yaleAuthToken,
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })

    .then(res => res.json())
    .then(json => {
      if (json.error === 'invalid_grant') {
        return Promise.reject(json.error_description)
      }
      else {
        fetch(urls.services, {
          method: 'GET',
          headers: {
            "Authorization": "Bearer " + access_token,
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        let token = {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
          token_type: json.token_type,
          expires_in: json.expires_in,
          scope: json.scope
        }
        return token
      }
    })

}

function refreshAccessToken(refresh_token) {
  payload = `grant_type=refresh_token&refresh_token=${encodeURIComponent(refresh_token)}`
  return fetch(urls.auth, {
    method: 'POST',
    body: payload,
    headers: {
      "Authorization": "Basic " + yaleAuthToken,
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })

    .then(res => res.json())
    .then(json => {
      if (json.error === 'invalid_grant') {
        return Promise.reject(json.error_description)
      }
      else {
        fetch(urls.services, {
          method: 'GET',
          headers: {
            "Authorization": "Bearer " + access_token,
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })
        let token = {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
          token_type: json.token_type,
          expires_in: json.expires_in,
          scope: json.scope
        }
        return token
      }
    })

}

function setAlarmStatus(access_token, alarmstate) {
  return new Promise((resolve, reject) => {
    if (!access_token || access_token.length === 0) {
      reject('Please call getAccessToken to get your access token first')
    }

    if (alarmstate !== 'arm' && alarmstate !== 'home' && alarmstate !== 'disarm') {
      reject('Invalid mode passed to setStatus')
    }

    return fetch(urls.setStatus, {
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
  getAccessToken,
  refreshAccessToken,
  setAlarmStatus,
  getAlarmStatus,
  getDeviceStatus
}