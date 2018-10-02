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
          // reconstruct aliasAction to one-dimention array
          var commands = result.results
          commands.forEach((cmd, index, array) => {
            var simplyfiedActions = []
            cmd.aliasActions.forEach((aa, i) => {
              aa.actions.forEach((a, j) => {
                simplyfiedActions.push({
                  alias: aa.alias,
                  actionName: a.name,
                  actionValue: a.value
                })
              })
            })
            array[index].simplyfiedActions = simplyfiedActions
          })
          resolve({
            data: commands.map(command => ({ ...command, id: command.commandID })),
            total: commands.length,
          })
        }).catch((err) => {
          reject(err)
        })
      }
    }
  })
}
