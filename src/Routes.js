import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Squat from './Components/Squat';
import Test from './Components/Test';
import { Login, Signup } from './Components/AuthForm';
import { me } from './store';
import { connect } from 'react-redux';
import Pushup from './Components/Pushup';
import Dips from './Components/Dips';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/squats" component={Squat} />
          <Route path="/pushups" component={Pushup} />
          <Route path="/dips" component={Dips} />
          <Route path="/test" component={Test} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
