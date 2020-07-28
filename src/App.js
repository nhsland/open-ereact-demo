import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import AuthProvider from './core/context/AuthContext';
import NavProvider from './core/context/NavContext';
import PatientProvider from './core/context/PatientContext';
import SettingsProvider from './core/context/SettingsContext';
import Routes from './core/routes';
import theme from './common/Layout/theme';
import './App.css'

export default () => {
  return (
    <AuthProvider>
      <NavProvider>
        <SettingsProvider>
          <PatientProvider>
            <ThemeProvider theme={theme}>
              <Routes />
            </ThemeProvider>
          </PatientProvider>
        </SettingsProvider>
      </NavProvider>
    </AuthProvider>
  );
};
