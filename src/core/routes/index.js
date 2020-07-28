import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import theme from '../../common/Layout/theme';
import PrivateRoute from './PrivateRoute';
import OpenRoute from './OpenRoute';
import SingIn from '../../common/Pages/SingIn';
import Tasks from '../../common/Pages/Tasks';
import Patients from '../../common/Pages/Patients';
import Search from '../../common/Pages/Search';
import ByQr from '../../common/Pages/Search/ByQr';
import Monitoring from '../../common/Pages/Monitoring';
import Recommendations from '../../common/Pages/Recommendations';
import PatientSummary from '../../common/Pages/PatientSummary';
import SepsisScreening from '../../common/Pages/SepsisScreening';
// import DenwisAssessment from '../../common/Pages/DenwisAssessment';

export default () => (
  <BrowserRouter>
    <Switch>
      <OpenRoute theme={theme.login} path="/sing-in" component={SingIn} />
      <PrivateRoute exact theme={theme.dashboard} appBar bottomToolbar path="/" component={Patients} />
      <PrivateRoute exact theme={theme.dashboard} appBar bottomToolbar path="/tasks" component={Tasks} />
      <PrivateRoute exact theme={theme.main} appBar bottomToolbar path="/search" component={Search} />
      <PrivateRoute exact theme={theme.main} appBar bottomToolbar path="/search-qr" component={ByQr} />
      <PrivateRoute exact theme={theme.main} path="/monitoring/:id" component={Monitoring} />
      <PrivateRoute exact theme={theme.main} path="/profile/:id" component={PatientSummary} />
      <PrivateRoute exact theme={theme.main} path="/recommendations/:id" component={Recommendations} />
      <PrivateRoute exact theme={theme.main} path="/sepsis-screening/:id" component={SepsisScreening} />
      {/* <PrivateRoute exact theme={theme.main} path="/denwis-assessment/:id" component={DenwisAssessment} /> */}
    </Switch>
  </BrowserRouter>
);
