import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import SelectInput from './SelectInput'
import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom';


const AddressForm = ({ checkoutToken, next }) => {
    // Form Methods
    const methods = useForm();

    // State for Shipping Addresses
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    
    const [shippingRegions, setShippingRegions] = useState([]);
    const [shippingRegion, setShippingRegion] = useState('');
    
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    // Menu Select Key-Value pairs
    const countries = Object.entries(shippingCountries).map(([ code, name ]) => ({ id: code, label: name }))
    const regions = Object.entries(shippingRegions).map(([ code, name ]) => ({ id: code, label: name }));
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}`}));

    // Fetching Countries
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    // Fetching Regions
    const fetchRegions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingRegions(subdivisions);
        setShippingRegion(Object.keys(subdivisions)[0]);
    }

    // Fetching Shipping Options
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    // Calling all Fetch functions
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchRegions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingRegion) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingRegion);
    }, [shippingRegion])

    // Building Layout
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider { ...methods }>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision: shippingRegion, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address1' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='ZIP / Postal Code' />
                        <SelectInput label='Shipping Country' value={shippingCountry} setValue={setShippingCountry} listOfOptions={countries} />
                        <SelectInput label='Shipping Region' value={shippingRegion} setValue={setShippingRegion} listOfOptions={regions} />
                        <SelectInput label='Shipping Options' value={shippingOption} setValue={setShippingOption} listOfOptions={options} />
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}> 
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
};

export default AddressForm;
