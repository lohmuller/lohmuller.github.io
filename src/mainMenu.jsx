import React from "react";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link as RoutedLink,
  NavLink
} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },

}));

export default function mainMenu() {
    const classes = useStyles();
    return <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Ian
          </Typography>
          <nav>
            <NavLink exact key="/" to="/" className={classes.link} activeClassName="active">
              Home
            </NavLink>
            <NavLink exact key="/about" to="/about" className={classes.link} activeClassName="active">
              About
            </NavLink>
            <NavLink exact key="/projects" to="/projects" className={classes.link} activeClassName="active">
              Projects
            </NavLink>
            <NavLink exact key="/contact" to="/contact" className={classes.link} activeClassName="active">
              Contact
            </NavLink>
          </nav>
        </Toolbar>
        </AppBar>
};

;