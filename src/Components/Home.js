import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import Typical from 'react-typical';
import Quotes from '../quotes';
import { Link } from 'react-router-dom';
import { fetchWorkout } from '../store/workouts';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.randomQuote = this.randomQuote.bind(this);
  }

  randomQuote(arr) {
    return arr.slice(0).sort(function () {
      return 0.5 - Math.random();
    });
  }

  componentDidMount() {
    this.props.getWorkout();
  }

  render() {
    return (
      <div>
        <div id="logo">
          <div id="logo-text">
            <h1>Test of Strength.</h1>Measure your strength and compete with the
            world with these physical challenges.
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Welcome {this.props.name ? this.props.name : 'Fighter'}</h1>
          </div>
          <button
            type="button"
            id="get-started"
            onClick={() => {
              let randomizer = Math.random();
              randomizer <= 0.33
                ? history.push('/squats')
                : randomizer > 0.33 && randomizer <= 0.66
                ? history.push('/pushup')
                : history.push('/dips');
            }}
          >
            <strong>Get Started</strong>
          </button>
          <div id="logo-text">
            <Quotes />
          </div>
        </div>
        <div id="tile-section">
          {' '}
          <Link to="/squats" id="individual-tile">
            <div>
              <img
                src="https://img.icons8.com/ios/452/squats.png"
                id="tile-pic"
                alt="squat-icon"
              />
              <h2>Squats</h2> <p>Test your leg strength</p>
            </div>
          </Link>
          <Link to="/pushups" id="individual-tile">
            <div>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/pushups-560460.png"
                id="tile-pic"
                alt="pushup-icon"
              />
              <h2>Pushups</h2> <p>Test your upper body strength</p>
            </div>
          </Link>
          <Link to="/dips" id="individual-tile">
            <div>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/bench-dips-2-871091.png"
                id="tile-pic"
                alt="dip-icon"
              />
              <h2>Dips</h2> <p>Test your arm strength</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getWorkout: () => dispatch(fetchWorkout()),
  };
};

const mapState = (state) => {
  return {
    name: state.auth.name,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState, mapDispatch)(Home);
