import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Title } from 'react-admin'

const State = () => (
  <Card>
    <Title title="State of thing" />
    <CardContent>
      Teperature: 35 degree
    </CardContent>
  </Card>
)

export default State
