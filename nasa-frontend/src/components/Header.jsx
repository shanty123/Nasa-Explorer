// src/components/Header.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import nasaLogo from '../assets/nasa.svg'; 

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'APOD', path: '/apod' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: '#ffff', width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={nasaLogo}
              alt="NASA Logo"
              sx={{ height: 50, width: 'auto' }}
            />
            <Typography variant="h6" color="black" fontWeight="bold">
              NASA Explorer
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  color: '#000',
                  textDecoration: 'none',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="default"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250, bgcolor: '#10111f', height: '100%', color: '#fff' }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <Box sx={{ textAlign: 'left', p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              NASA Explorer
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemText primary={item.label} sx={{ color: '#fff' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
