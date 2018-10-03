export function simplyfyAliasActions (aliasActions) {
  var simplyfiedActions = []
  aliasActions.forEach((aa, i) => {
    aa.actions.forEach((a, j) => {
      simplyfiedActions.push({
        alias: aa.alias,
        actionName: a.name,
        actionValue: a.value
      })
    })
  })
  return simplyfiedActions
}
