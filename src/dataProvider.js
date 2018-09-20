import { APIAuthor, TypedID, Types, App, Site } from 'thing-if'
import { getLoginUser, getOnboardedThing } from './common/utils'
import { GET_LIST } from 'react-admin'
import { KiiApp } from './config'

export const dataProvider = (type, resource, params) => {
  return new Promise((resolve, reject) => {
    console.log('loginUser: ' + JSON.stringify(getLoginUser()))
    console.log('onboardedThing: ' + JSON.stringify(getOnboardedThing()))
    const apiAuthor = new APIAuthor(
      getLoginUser().token,
      new App(KiiApp.appID, KiiApp.appKey, Site.JP))
    if (resource === 'commands') {
      if (type === GET_LIST) {
        apiAuthor.listCommands(new TypedID(Types.Thing, getOnboardedThing().thingID)).then((result) => {
          resolve({
            data: result.results.map(command => ({ ...command, id: command.commandID })),
            total: result.results.length,
          })
        }).catch((err) => {
          reject(err)
        })
      }
    }
  })
}
