import React from 'react';
import { Grid, InputLabel, Select, MenuItem } from '@material-ui/core'

const SelectInput = ({ label, value, setValue, listOfOptions }) => {
    // Building Layout    
    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} fullWidth onChange={(e) => setValue(e.target.value)}>
                {
                    listOfOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </Grid>
    )
};

export default SelectInput;
