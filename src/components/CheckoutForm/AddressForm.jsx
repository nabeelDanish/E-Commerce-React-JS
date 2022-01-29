import React from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

const AddressForm = () => {
    // Form Methods
    const methods = useForm();

    // Building Layout
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider { ...methods }>
                <form onSubmit={}>
                    <Grid container spacing={3}>
                        
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
};

export default AddressForm;
