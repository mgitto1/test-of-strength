import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    // const { handleClick, isLoggedIn } = this.props;
    //let currentUrl = this.props.location.split('/')[1] || '';
    return (
      <div id="nav-parent">
        <nav>
          {/* {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in
              <Link
                to="/home"
                className={'products' === currentUrl ? 'selected' : ''}
              >
                Home
              </Link>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : ( */}
          <div id="Navbar">
            {/* The navbar will show these links before you log in */}
            <Link to="/">Tests of Strength</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </div>
    );
  }
}

// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

export default Navbar;
