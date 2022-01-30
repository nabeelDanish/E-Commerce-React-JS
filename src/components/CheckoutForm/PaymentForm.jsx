import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review'

// Creating Stripe Promise
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Payment Form Component
const PaymentForm = ({ checkoutToken, backStep, onCaptureCheckout, nextStep, shippingData, timeout }) => {
    
    // Handling the Submit Payment function
    const handleSubmit = async (event, elements, stripe) => {
        
        // Preventing Default form to be submitted
        event.preventDefault();
        
        // Making sure both Stripe and Stripe elements are loaded
        if (!stripe || !elements) return;
        
        // Creating a Card Element to create a Payment Method
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        // If no error than placing the order
        if (error) {
            console.log(error);
        } else {
            // Creating the main Order Data object to be sent 
            // to Stripe
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { 
                    firstname: shippingData.firstName, 
                    lastname: shippingData.lastName, 
                    email: shippingData.email, 
                },
                shipping: { 
                    name: shippingData.shippingOption, 
                    street: shippingData.address1, 
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry, 
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            // Calling the Commerce API for Order fulfillment
            onCaptureCheckout(checkoutToken.id, orderData);

            // Calling Timeout
            timeout();

            // Moving to the next Step
            nextStep();
        }
    }

    // Building Layout
    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /><br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
};

export default PaymentForm;
