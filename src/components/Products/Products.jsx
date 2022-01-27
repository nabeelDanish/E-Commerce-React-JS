import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";

const products = [
    { id: 1, name: 'Shoes', description: 'NIKE Running Shoes', price: '$15', image: 'data:image/jpeg;base64,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'},
    { id: 2, name: 'MacBook', description: 'Apple MacBook PRO', price: '$999', image: 'data:image/jpeg;base64,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'},
]

const Products = () => {
    return (
        <main>
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
