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

## Features

### auth.getAccessToken

`auth.getAccessToken` will retrieve a token you will need to do any get or posts to the system. It takes two arguments, your username and password.

```
auth.getAccessToken('username', 'password');
```
The function will return a promis for an access token, as well as the refresh token in a JSON format.

### auth.refreshAccessToken

`auth.refreshAccessToken` will refresh the access token using the refresh access token you get by calling auth.getAccessToken. It takes one argument, the refresh token.

```
auth.refreshAccessToken(refresh_token);
```
The function will return a promis for an access token, as well as the refresh token in a JSON format.


alarm.setAlarmStatus(access_token, alarmstate)


### alarm.getAlarmStatus

`alarm.getAlarmStatus` will retrieve the status of the alarm system, it returns the response the API returns.

```
alarm.getAlarmStatus('access_token');
```

As the example shows you will need to pass the access token you get from the auth.getAccessToken into the getAlarmStatus method. The module is promise based, but do not yet support chain. 


### alarm.setAlarmStatus

`alarm.setAlarmState` will set the status of the alarm system. It takes two parameters:

* Access Token - This is retrieved using `auth.getAccessToken`
* Mode - The mode can either be 'arm', 'home' or 'disarm'

```
alarm.setAlarmState('access_token', 'arm');
```

As the example shows you will need to pass the token into the setAlarmStatus method call. The module is promise based, but do not yet support chain. 


### device.getDeviceStatus

`device.getDeviceStatus` will get the status on all devices as an JSON array. It takes one parameters:

* Access Token - This is retrieved using `auth.getAccessToken`

```
device.getDeviceStatus(access_token);
```

As the example shows you will need to pass the token into the setAlarmStatus method call. The module is promise based, but do not yet support chain. 


## TODO
- Add more documentation to readme.md
- Add additional endpoints


