import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

// Form Progress States
const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart }) => {
    // Using Styles
    const classes = useStyles();

    // Current Step State
    const [activeStep, setActiveStep] = useState(0);

    // Checkout Token State
    const [checkoutToken, setCheckoutToken] = useState(null);

    // Creating the Checkout Token
    useEffect(() => {
        // Creating a generateToken function to call the API
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
            } catch (error) {

            }
        }

        // Call to generateToken 
        generateToken();
    }, [cart]);

    // Confirmation Component
    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    // Form Component
    const Form = () => activeStep === 0 
        ? <AddressForm checkoutToken={checkoutToken}/> 
        : <PaymentForm />

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
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
};

export default Checkout;
