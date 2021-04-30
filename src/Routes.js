import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Squat from './Components/Squat';
// import Squat from './Components/Squat';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="/login" component={Login} /> */}
          {/* <Route path="/signup" component={Signup} /> */}
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/squats" component={Squat} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
