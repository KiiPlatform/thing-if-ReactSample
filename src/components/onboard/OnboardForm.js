import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'vendorThingID',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required*'
    }
  })
  return errors
}

const renderTextField = ({
  value,
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      label={label}
      error={touched && !!error}
      helperText={error}
      {...input}
      {...custom}
    />)
}

const OnboardForm = props => {
  const { handleSubmit, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignContent: 'space-around'
      }}>
        <div style={{
          margin: '5px 5px 5px 5px'
        }}>
          <Field
            name="vendorThingID"
            component={renderTextField}
            label="Vendor Thing ID*"
          />
        </div>
        <div style={{
          margin: '5px 5px 5px 5px'
        }}>
          <Field
            name="password"
            type='password'
            component={renderTextField}
            label="Password*"
          />
        </div>
        <div style={{
          margin: '5px 5px 5px 5px'
        }}>
          <Field
            name="thingType"
            component={renderTextField}
            label="Thing Type"
          />
        </div>
        <div style={{
          margin: '5px 5px 5px 5px'
        }}>
          <Field
            name="firmwareVersion"
            component={renderTextField}
            label="Version of Firmware"
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'flex-start',
        }}>
          <div style={{
            margin: '5px 5px 5px 5px'
          }}>
            <Button
              variant="contained"
              color="primary"
              disabled={submitting}
              type='submit'
            >Onboard
            </Button>
          </div>
          <div style={{
            margin: '5px 5px 5px 5px'
          }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={submitting}
              type='button'
              onClick={reset}
            >
                Clear Values
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

function mapStateToProps (state, ownProps) {
  return {
    submitting: state.onboard.isLoading
  }
}
export default reduxForm({
  form: 'OnboardForm', // a unique identifier for this form
  validate
})(connect(mapStateToProps)(OnboardForm))
