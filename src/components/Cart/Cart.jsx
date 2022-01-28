import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles'
import CartItem from './CartItem/CartItem';

const Cart = ({ cart }) => {
    // Using Style classes
    const classes = useStyles();

    // Empty Cart Component
    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                You have no items in your shopping cart!
            </Typography>
        )
    }

    // FilledCart Component
    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item}/>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h5" gutterBottom>Subtotal: { cart.subtotal.formatted_with_symbol }</Typography>
                    <div>
                        <Button 
                            className={classes.emptyButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary">
                                Empty Cart
                        </Button>
                        <Button 
                            className={classes.checkoutButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="primary">
                                Checkout
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    // Building Layout
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4" gutterBottom>Your Shopping Cart</Typography>
            { !cart.total_items ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
};

export default Cart;
