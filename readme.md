# yale-proxy

[![npm version](https://img.shields.io/npm/v/yale-proxy.svg?style=flat-square)](https://www.npmjs.org/package/yale-proxy)

Promise based package, which acts as a proxy to the undocumented Yale Smart Hub API. I created this to be able to integrate the Yale doorman and other components into my custom Home Operating System - Anorak.

Feel free to use this in your project, but be warned, it may (most likeley) fail at any time. Partly or fully.

Happy hacking!

## Installing

Using npm:

```bash
$ npm install yale-proxy
```

Using bower:

```bash
$ bower install yale-proxy
```

Using yarn:

```bash
$ yarn add yale-proxy
```

## Example

```nodejs
const yale = require(`yale-proxy`)

const token = yale.auth.getAccessToken(username, password)
token.then(function(result) {
    res.json(result)
})
```

### Features
// Auth

auth.getAccessToken(username, password)

auth.refreshAccessToken(refresh_token)


// Alarm

alarm.setAlarmStatus(access_token, alarmstate)

alarm.getAlarmStatus(access_token)


// Devices
device.getDeviceStatus(access_token)

## TODO
- Clean up/remove old API
- Add documentation to readme.md


