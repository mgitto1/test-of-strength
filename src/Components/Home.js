import React from 'react';
import history from '../history';

class Home extends React.Component {
  render() {
    return (
      <div id="logo">
        <div id="logo-text">
          <h1>Test of Strength.</h1>Measure your strength and level up with
          physical challenges.
        </div>
        <button
          type="button"
          id="get-started"
          onClick={() => history.push('/squats')}
        >
          <strong>Get Started</strong>
        </button>
      </div>
    );
  }
}

export default Home;
