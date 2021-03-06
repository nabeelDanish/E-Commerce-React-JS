import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
    // Using Styles
    const classes = useStyles();

    // Loading
    if (!products.length) {
        return (
            <>
                <div className={classes.toolbar} />
                <div className={classes.loading}>
                    <CircularProgress size={80}/>
                </div>
            </>
        )
    }

    // Building Layout
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                { products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} ms={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                )) }
            </Grid>
        </main>
    )
}

export default Products;
