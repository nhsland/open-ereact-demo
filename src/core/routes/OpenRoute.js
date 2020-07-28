import React from 'react';
import { Route } from 'react-router-dom';

import Layout from '../../common/Layout';
import AppBarOpenRoute from '../../common/Layout/AppBarOpenRoute';

export default ({ component: Component, theme, appBar, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={routeProps => (
        <Layout theme={theme} appBar={appBar && <AppBarOpenRoute />}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...routeProps} />
        </Layout>
      )}
    />
  );
};
