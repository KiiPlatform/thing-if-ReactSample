import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import OnboardForm from './OnboardForm';
import { connect } from 'react-redux'


import { onboardRequest as onboardRequestAction } from '../../actions/onboard'
import { OnboardWithVendorThingIDRequest } from 'thing-if'

class Onboard extends React.PureComponent {
    render () {
        const { onboardRequest, submitting } = this.props
        return (
        <Card>
            <CardHeader title="Onboard a Thing" />
            <CardContent>
            <OnboardForm
                onSubmit={ (formValue) => {
                    const requestObj = new OnboardWithVendorThingIDRequest(
                            formValue.vendorThingID,
                            formValue.password,
                            'USER:' + localStorage.getItem('userID'),
                            formValue.thingType,
                            formValue.firmwareVersion)
                    onboardRequest(
                        localStorage.getItem('userID'),
                        localStorage.getItem('token'),
                        requestObj
                    )
                }}
                submitting={submitting}
            />
            </CardContent>
        </Card>
    )}
}

const mapStateToProps = state => ({
    submitting: state.onboard.isLoading,
});

export default connect(
    mapStateToProps,
    {
        onboardRequest: onboardRequestAction
    })(Onboard);
