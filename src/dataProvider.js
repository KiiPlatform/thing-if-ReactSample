import { APIAuthor, TypedID, Types, App, Site, PostCommandRequest, AliasAction, Action, StatePredicate, ScheduleOncePredicate, PostCommandTriggerRequest, TriggerCommandObject, PostServerCodeTriggerRequest, ServerCode, Condition } from 'thing-if'
import { getLoginUser, getOnboardedThing } from './common/utils'
import { GET_LIST, CREATE, UPDATE, DELETE } from 'react-admin'
import { KiiApp } from './config'
import { simplyfyAliasActions, uiClauseToTriggerClause } from './common/ThingIfAdaptor'

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
        const {
          eventSource,
          triggersWhat,
          triggersWhen,
          clause,
          scheduleAt,
          command,
          title,
          description,
        } = params.data
        var predicate
        if (eventSource === 'States') { // use StatePredicate
          const condition = new Condition(uiClauseToTriggerClause(clause))
          predicate = new StatePredicate(condition, triggersWhen)
        } else if (eventSource === 'ScheduleOnce') {
          predicate = new ScheduleOncePredicate((new Date(scheduleAt)).getTime())
        }
        if (triggersWhat === 'Command') {
          var triggerActions = []
          command.actions.forEach((action) => {
            triggerActions.push(new Action(action.actionName, action.actionValue))
          })
          const aliasActions = new AliasAction('AC', triggerActions)
          const triggerCommand = new TriggerCommandObject(
            [aliasActions],
            target,
            issuer,
          )
          const requestObject = new PostCommandTriggerRequest(
            triggerCommand,
            predicate,
            title,
            description)
          apiAuthor.postCommandTrigger(target, requestObject).then((newTrigger) => {
            resolve({
              data: {
                ...newTrigger,
                id: newTrigger.triggerID
              }
            })
          }).catch((err) => {
            reject(err)
          })
        } else if (triggersWhat === 'ServerCode') {
          const { endpoint, executorAccessToken, targetAppID, parameters } = params.data.serverCode
          var scParams = {}
          Object.keys(parameters | []).forEach((param) => {
            scParams[param.name] = param.value
          })
          const servercode = new ServerCode(
            endpoint,
            executorAccessToken,
            targetAppID,
            scParams
          )
          const requestObject = new PostServerCodeTriggerRequest(
            servercode,
            predicate,
            title,
            description
          )
          apiAuthor.postServerCodeTrigger(target, requestObject).then((newTrigger) => {
            resolve({
              data: {
                ...newTrigger,
                id: newTrigger.triggerID
              }
            })
          }).catch((err) => {
            reject(err)
          })
        } else {
          reject(new Error('Unknown type of triggers what.'))
        }
      } else if (type === UPDATE) {
        reject(Error.new('not implmment yet'))
      } else if (type === DELETE) {
        apiAuthor.deleteTrigger(target, params.id).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      }
    }
  })
}
