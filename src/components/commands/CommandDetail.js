import React from 'react'
import { Show, SimpleShowLayout, TextField, DateField } from 'react-admin'

const ActionsField = ({ record }) => {
  return <ul>
    {record.aliasActions.map(alias => {
      return <ul key={alias.alias}>
        {alias.actions.map(action => {
          return <li key={action.name}>{action.name}: {action.value ? 'on' : 'off'}</li>
        })}
      </ul>
    })
    }
  </ul>
}
ActionsField.defaultProps = { addLabel: true }

const CommandDetail = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <ActionsField source="actions" />
      <DateField label="Created date" source="created" showTime />
      <DateField label="Modified date" source="modified" showTime />
    </SimpleShowLayout>
  </Show>
)

export default CommandDetail
