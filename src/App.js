import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import { Products, Navbar } from './components'

const App = () => {

    // Products State
    const [products, setProducts] = useState([]);

    // Cart State
    const [cart, setCart] = useState({});

    // Fetching Products function
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    // Fetching Cart
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    // Add to cart function
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart)
    }

    // Call to fetch once the app loads
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    console.log(cart);

    // Building Layout
    return (
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Products products={products} onAddToCart={handleAddToCart} />
        </div>
    );
};

export default App;
