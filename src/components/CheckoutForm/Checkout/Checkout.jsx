import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

// Form Progress States
const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    // Using Styles
    const classes = useStyles();

    // Current Step State
    const [activeStep, setActiveStep] = useState(0);

    // Checkout Token State
    const [checkoutToken, setCheckoutToken] = useState(null);

    // Shippping Data State
    const [shippingData, setShippingData] = useState({});

    // Creating the Checkout Token
    useEffect(() => {
        // Creating a generateToken function to call the API
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }

        // Call to generateToken 
        generateToken();
    }, [cart]);

    // Moving the Step
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    // Moving Form Information
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    // Confirmation Component
    let Confirmation = () => order.customer? (
        <>
            <div>
                <Typography variant="h5">Thank You for your Purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order Reference: {order.customer_reference}</Typography>
                <br />
                <Button component={Link} to="/" variant="outline" type="button">Back to Home</Button>
            </div>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    // If errors then Confirmation problem
    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outline" type="button">Back to Home</Button>
        </>
    }

    // Form Component
    const Form = () => activeStep === 0 
        ? <AddressForm 
            checkoutToken={checkoutToken} 
            next={next}/> 
        : <PaymentForm 
            checkoutToken={checkoutToken} 
            backStep={backStep} 
            nextStep={nextStep} 
            onCaptureCheckout={onCaptureCheckout}
            shippingData={shippingData}/>

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
