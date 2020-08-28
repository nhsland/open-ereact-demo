import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import Layout from '../../common/Layout';
import AppBarDashboard from '../../common/Layout/AppBarDashboard';
import Spinner from '../../common/Components/Spinner';

export default ({ component: Component, theme, appBar, bottomToolbar, ...rest }) => {
  const { auth } = useContext(AuthContext);
  const { loading } = auth;

  if (loading) {
    return (
      <Route
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={() => {
          return <Spinner />;
        }}
      />
    );
  }

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={routeProps =>
        auth.data
          ? (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Layout theme={theme} bottomToolbar={bottomToolbar} {...(appBar ? { appBar: <AppBarDashboard /> } : {})}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...routeProps} />
            </Layout>
          ) : (
            <Redirect to="/sign-in" />
          )
      }
    />
  );
};
