export function storeKiiInfo (kiiInfo) {
  const { user, thing } = kiiInfo
  if (user) {
    const { userID, token } = user
    window.localStorage.setItem('loginUser-id', userID)
    window.localStorage.setItem('loginUser-token', token)
  }
  if (thing) {
    const { vendorThingID, thingID } = thing
    window.localStorage.setItem('onboardedThing-vid', vendorThingID)
    window.localStorage.setItem('onboardedThing-id', thingID)
  }
}

export function getKiiInfo () {
  var kiiInfo = {}
  const userID = window.localStorage.getItem('loginUser-id')
  const token = window.localStorage.getItem('loginUser-token')
  if (userID && token) {
    kiiInfo['user'] = {
      userID: userID,
      token: token,
    }
  }

  const vendorThingID = window.localStorage.getItem('onboardedThing-vid')
  const thingID = window.localStorage.getItem('onboardedThing-id')
  if (vendorThingID && thingID) {
    kiiInfo['thing'] = {
      vendorThingID: vendorThingID,
      thingID: thingID,
    }
  }

  return kiiInfo
}

export function getLoginUser () {
  return getKiiInfo().user
}

export function getOnboardedThing () {
  return getKiiInfo().thing
}

export function storeKiiUser (userId, token) {
  storeKiiInfo({
    user: {
      userID: userId,
      token: token,
    }
  })
}

export function storeThing (vendorThingID, thingID) {
  storeKiiInfo({
    thing: {
      vendorThingID: vendorThingID,
      thingID: thingID,
    }
  })
}

export function removeKiiUser () {
  window.localStorage.removeItem('loginUser-id')
  window.localStorage.removeItem('loginUser-token')
}

export function removeOnboardedThing () {
  window.localStorage.removeItem('onboardedThing-vid')
  window.localStorage.removeItem('onboardedThing-id')
}

export function accessAttributeByPath (obj, path) {
  if (!obj) {
    return null
  }
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  var a = path.split('.')
  var o = obj
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (k in o) {
      o = o[k]
    } else {
      return null
    }
  }
  return o
}
