import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ReactCountryFlag from "react-country-flag"
import { getRoutes, getElementByRoute } from './Routes';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

import { useTranslation, initReactI18next } from "react-i18next";

interface languageType {
  txt: string;
  flag: string;
  key: string;
  alias: Array<string>
}

const languages: Array<languageType> = [
  { txt: 'English', flag: "us", key: "en", alias: ['en', 'gb-en'] },
  { txt: 'Portuguese', flag: "br", key: "pt", alias: ['pt', 'pt-br', 'br'] },
  { txt: 'Japanese', flag: "jp", key: "jp", alias: ['jp'] }
];


interface Props {
  defaultLanguage: string;
  pages: Array<string>;
}

function findFlagByKey(key: string): string {
  const language = languages.find((lang) => lang.key === key);
  return language ? language.flag : "en";
}
function findTextByKey(key: string): string {
  const language = languages.find((lang) => lang.key === key);
  return language ? language.txt : "en";
}

function ResponsiveAppBar({ defaultLanguage, pages }: Props) {

  const initialValue = sessionStorage.getItem('language') || defaultLanguage;
  const [language, setStateLanguage] = React.useState(initialValue);

  const { t, i18n } = useTranslation();

  const setLanguage = (language: string) => {
    setStateLanguage(language);
    i18n.changeLanguage(language);
  }

  useEffect(() => {
    sessionStorage.setItem('language', language);
  }, [language]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Burger Menu */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ian
          </Typography>


          {/* Page Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (

              <Button
                component={RouterLink}
                to={page}
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {t(page)}
              </Button>
            ))}
          </Box>
          {/* Language button */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t("Change Language")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ReactCountryFlag
                  countryCode={findFlagByKey(language)}
                  svg
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                  title={findTextByKey(language)}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.txt} onClick={() => { setLanguage(lang.key); handleCloseUserMenu(); }} selected={lang.alias.includes(language)}>
                  <ReactCountryFlag
                    countryCode={lang.flag}
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                      marginRight: '0.5em'
                    }}
                    title={lang.txt}
                  />
                  <Typography textAlign="center">
                    {lang.alias.includes(language) ? "=>" : ""}
                    {lang.txt}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;