import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import useStyles from './styles'

const CartItem = ({ item, handleUpdateToCartQty, handleRemoveFromCart}) => {
    // Using Styles
    const classes = useStyles();

    // Update Quantity Function
    const updateQty = (inc) => {
        handleUpdateToCartQty(item.id, item.quantity + inc);
    }

    // Building Layout
    return (
        <Card>
            <CardMedia image={item.image.url} className={classes.media} alt={item.name}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="h7">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => updateQty(-1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => updateQty(1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
};

export default CartItem;
