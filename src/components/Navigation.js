// Navigation.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, Typography, AppBar, Toolbar } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NoSkills
        </Typography>
        <MuiLink component={RouterLink} to="/" color="inherit" style={{ margin: '0 10px' }}>
          Home
        </MuiLink>
        <MuiLink component={RouterLink} to="/brawls" color="inherit" style={{ margin: '0 10px' }}>
          Brawls
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
