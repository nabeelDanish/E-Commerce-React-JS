import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = () => {
    // Using Styles
    const classes = useStyles();

    // Current Step State
    const [activeStep, setActiveStep] = useState(0);

    // Confirmation Component
    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    // Form Component
    const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />

    // Building Layout
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        { steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        )) }
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : <Form /> }
                </Paper>
            </main>
        </>
    )
};

export default Checkout;
