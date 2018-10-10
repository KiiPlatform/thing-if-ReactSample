import { AndClauseInTrigger, EqualsClauseInTrigger, NotEqualsClauseInTrigger, RangeClauseInTrigger, OrClauseInTrigger } from 'thing-if'
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

export function uiClauseToTriggerClause (clause) {
  if (!clause) {
    return null
  }
  const { type, clauses, value, field } = clause
  const alias = 'AC'
  var subClauses = []
  var triggerClause
  if (clauses) {
    clauses.forEach((rawClause) => {
      subClauses.push(uiClauseToTriggerClause(rawClause))
    })
  }
  if (type === 'and') {
    triggerClause = new AndClauseInTrigger(subClauses)
  } else if (type === 'or') {
    triggerClause = new OrClauseInTrigger(subClauses)
  } else if (type === 'equals') {
    triggerClause = new EqualsClauseInTrigger(alias, field, value)
  } else if (type === 'notEquals') {
    triggerClause = new NotEqualsClauseInTrigger(alias, field, value)
  } else if (type === 'greaterThan') {
    triggerClause = RangeClauseInTrigger.greaterThan(alias, field, value)
  } else if (type === 'greaterEquals') {
    triggerClause = RangeClauseInTrigger.greaterThanEquals(alias, field, value)
  } else if (type === 'lessThan') {
    triggerClause = RangeClauseInTrigger.lessThan(alias, field, value)
  } else if (type === 'lessEquals') {
    triggerClause = RangeClauseInTrigger.lessThanEquals(alias, field, value)
  }
  return triggerClause
}
