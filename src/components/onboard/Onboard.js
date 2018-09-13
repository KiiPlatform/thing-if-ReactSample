import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import OnboardForm from './OnboardForm';

export default () => (
    <Card>
        <CardHeader title="Onboard a Thing" />
        <CardContent>
          <OnboardForm />
        </CardContent>
    </Card>
);