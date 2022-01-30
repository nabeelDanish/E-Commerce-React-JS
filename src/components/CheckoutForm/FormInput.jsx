import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {
    // Getting Form Context Control
    const { control } = useFormContext();

    // Building Layout
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render={
                    ({ field }) => 
                    <TextField 
                        {...field} 
                        label={label}
                        fullWidth
                        required
                    />
                }
                name={name}
                control={control}
            />
        </Grid>
    );
};

export default FormInput;
