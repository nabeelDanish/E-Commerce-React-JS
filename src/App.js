import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce'
import { Products, Navbar } from './components'

const App = () => {

    // Products State
    const [products, setProducts] = useState([]);

    // Fetching Products function
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    // Call to fetch once the app loads
    useEffect(() => {
        fetchProducts();
    }, [])

    // Building Layout
    return (
        <div>
            <Navbar />
            <Products products={products}/>
        </div>
    );
};

export default App;
