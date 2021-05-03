import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import history from '../history';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      location: history.location.pathname,
    };
  }

  handleClick(event) {
    this.setState({ location: event.target.name });
  }
  render() {
    // const { handleClick, isLoggedIn } = this.props;
    //let currentUrl = this.props.location.split('/')[1] || '';
    const location = history.location.pathname;
    return (
      <div id="nav-parent">
        <nav id="nav-text">
          {this.props.isLoggedIn ? (
            <div id="Navbar">
              <Link
                to="/"
                onClick={this.handleClick}
                className={'/' === location ? 'selected' : ''}
              >
                Tests of Strength
              </Link>
              <Link
                to="/dashboard"
                onClick={this.handleClick}
                className={'/dashboard' === location ? 'selected' : ''}
              >
                Dashboard
              </Link>
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div id="Navbar">
              <Link
                to="/"
                onClick={this.handleClick}
                className={'/' === location ? 'selected' : ''}
              >
                Tests of Strength
              </Link>
              <Link
                to="/dashboard"
                onClick={this.handleClick}
                className={'/dashboard' === location ? 'selected' : ''}
              >
                Dashboard
              </Link>
              <Link to="/signup" onClick={this.handleClick}>
                Sign Up
              </Link>
              <Link to="/login" onClick={this.handleClick}>
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
