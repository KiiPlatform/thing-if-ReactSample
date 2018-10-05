import { APIAuthor, TypedID, Types, App, Site, PostCommandRequest, AliasAction, Action } from 'thing-if'
import { getLoginUser, getOnboardedThing } from './common/utils'
import { GET_LIST, CREATE, UPDATE, DELETE } from 'react-admin'
import { KiiApp } from './config'
import { simplyfyAliasActions } from './common/ThingIfAdaptor'

export const dataProvider = (type, resource, params) => {
  return new Promise((resolve, reject) => {
    const target = new TypedID(Types.Thing, getOnboardedThing().thingID)
    const issuer = new TypedID(Types.User, getLoginUser().userID)
    const apiAuthor = new APIAuthor(
      getLoginUser().token,
      new App(KiiApp.appID, KiiApp.appKey, Site.JP))

    if (resource === 'commands') {
      if (type === GET_LIST) {
        apiAuthor.listCommands(target).then((result) => {
          // reconstruct aliasAction to one-dimention array
          var commands = result.results
          commands.forEach((cmd, index, cmds) => {
            cmds[index].simplyfiedActions = simplyfyAliasActions(cmd.aliasActions)
          })
          resolve({
            data: commands.map(command => ({ ...command, id: command.commandID })),
            total: commands.length,
          })
        }).catch((err) => {
          reject(err)
        })
      } else if (type === CREATE) {
        var newActions = []
        params.data.actions.forEach((action) => {
          newActions.push(new Action(action.actionName, action.actionValue))
        })
        const aliasActions = new AliasAction('AC', newActions)
        const postCommandRequest = new PostCommandRequest(
          [aliasActions],
          issuer,
          params.data.title,
          params.data.description
        )
        apiAuthor.postNewCommand(target, postCommandRequest).then((newCmd) => {
          return apiAuthor.getCommand(target, newCmd.commandID)
        }).then((newCmd) => {
          resolve({
            data: {
              ...newCmd,
              id: newCmd.commandID,
              simplyfiedActions: simplyfyAliasActions(newCmd.aliasActions)
            }
          })
        }).catch((err) => {
          reject(err)
        })
      }
    } else if (resource === 'triggers') {
      if (type === GET_LIST) {
        apiAuthor.listTriggers(target).then((listResult) => {
          console.log('triggers: ' + JSON.stringify(listResult))
          const triggers = listResult.results
          resolve({
            data: triggers.map(trigger => ({
              ...trigger,
              id: trigger.triggerID,
              triggersWhat: trigger.command ? 'Command' : 'ServerCode',
            })),
            total: triggers.length,
          })
        }).catch((err) => {
          reject(err)
        })
      } else if (type === CREATE) {
        // TODO: implement me
        reject(Error.new('not implmment yet'))
      } else if (type === UPDATE) {
        reject(Error.new('not implmment yet'))
      } else if (type === DELETE) {
        reject(Error.new('not implmment yet'))
      }
    }
  })
}
