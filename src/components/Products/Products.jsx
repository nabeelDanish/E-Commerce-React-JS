import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from './styles';

const products = [
    { id: 1, name: 'Almond Sohan Halwa', description: 'Enriched with fresh almonds from the mountains of Swat', price: '$10', image: 'https://www.hafizhalwa.com/wp-content/uploads/2021/06/IMG_1059-450x450.jpg'},
    { id: 2, name: 'Walnut Sohan Halwa', description: 'These Persian-dry walnut ladden halwa will surely bring you closer to heaven', price: '$15', image: 'https://www.hafizhalwa.com/wp-content/uploads/2021/06/IMG_0903-450x450.jpg'},
    { id: 3, name: 'Special Mix Dry Fruit Halwa', description: 'Combination of the finest dry fruits from Pakistan', price: '$17', image: 'https://www.hafizhalwa.com/wp-content/uploads/2021/06/IMG_1008-450x450.jpg'},
];

const Products = () => {
    // Using Styles
    const classes = useStyles();

    // Building Layout
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                { products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} ms={4} lg={3}>
                        <Product product={product}/>
                    </Grid>
                )) }
            </Grid>
        </main>
    )
}

export default Products;
