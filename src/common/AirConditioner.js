const schema = require('./AirConditionerSchema.json')

export function getActions () {
  if (!schema.actions) {
    return {}
  }
  var newActions = {}
  schema.actions.forEach(action => {
    Object.keys(action).forEach((actionName) => {
      newActions[actionName] = action[actionName]
    })
  })
  return newActions
}
