import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
    // Getting Form Context Control
    const { control } = useFormContext();

    // Building Layout
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                render = {({field})=> (
                    <TextField fullWidth label={label} required/>
                )}
            />
        </Grid>
    );
};

export default FormInput;
