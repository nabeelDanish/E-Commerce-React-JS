import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateToCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    // Using Style classes
    const classes = useStyles();

    // Null Return
    if (!cart.line_items) {
        return (
            <>
                <div className={classes.toolbar} />
                <div className={classes.loading}>
                    <CircularProgress size={80}/>
                </div>
            </>
        )
    }

    // Empty Cart Component
    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                You have no items in your shopping cart.
                <Link to='/' className={classes.link}>Explore our collection of delicacies</Link>
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
                            <CartItem 
                                item={item} 
                                handleUpdateToCartQty={handleUpdateToCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
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
                            color="secondary"
                            onClick={handleEmptyCart}>
                                Empty Cart
                        </Button>
                        <Button 
                            className={classes.checkoutButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to='/checkout'>
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
