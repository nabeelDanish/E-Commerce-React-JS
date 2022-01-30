import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

    // Products State
    const [products, setProducts] = useState([]);

    // Cart State
    const [cart, setCart] = useState({});

    // Order State
    const [order, setOrder] = useState({});

    // Error State
    const [errorMessage, setErrorMessage] = useState('');

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
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    // Update Cart Quantity
    const handleUpdateToCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    // Remove from Cart
    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    // Clear Cart
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    // Refresh Cart
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    // Placing Order Function
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
            // Testing only
            refreshCart();
        }
    }

    // Call to fetch once the app loads
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    // Building Layout
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Routes>
                    <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
                    <Route path='/cart' element={
                        <Cart 
                            cart={cart} 
                            handleUpdateToCartQty={handleUpdateToCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    }/>
                    <Route path='/checkout' element={
                        <Checkout 
                            cart={cart} 
                            order={order} 
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}/>
                    }/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
