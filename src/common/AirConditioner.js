const schema = require('./AirConditionerSchema.json')

export function getActionDefinitions () {
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

export function getStateDefinitions () {
  if (!schema.states) {
    return {}
  }
  var newStates = {}
  schema.states.forEach(state => {
    Object.keys(state).forEach((stateName) => {
      newStates[stateName] = state[stateName]
    })
  })
  return newStates
}
