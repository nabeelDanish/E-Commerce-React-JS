import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/commerce.png'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    // Using Styles
    const classes = useStyles();

    // Using Location
    const location = useLocation();

    // Building Layout
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit' component={Link} to="/">
                        <img src={logo} alt="DUKAN" height="25px" className={classes.image} />
                        Nabeel's Halwa House
                    </Typography>
                    <div className={classes.grow}/>
                    { location.pathname === '/' ?
                        (
                            <div className={classes.button}>
                                <IconButton component={Link} to="/cart" aria-label='Show Cart Items' color='inherit'>
                                    <Badge badgeContent={totalItems} color='secondary'>
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </div>
                        ) : ( <></> )
                    }
                </Toolbar>
            </AppBar>
        </>
    )
};

export default Navbar;
