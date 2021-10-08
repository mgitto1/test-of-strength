import axios from 'axios';
import React from 'react';
import history from '../../util/history';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Counter extends React.Component {
  intervalId = 0;
  constructor(props) {
    super(props);
    this.counterFunction = this.counterFunction.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      workoutArr: JSON.parse(localStorage.getItem('position')),
      workoutCount: 0,
      nextPosition: '',
    };
  }
  handleClick() {
    confirmAlert({
      title: 'Submit Workout',
      message: 'Are you sure you want to submit your workout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const token = window.localStorage.getItem('token');
            const sendData = {
              headers: {
                authorization: token,
              },
            };
            if (localStorage.getItem('workout') === 'squats') {
              localStorage.setItem('squatCount', this.state.workoutCount);
              axios.post(
                '/api/workouts/',
                { squats: this.state.workoutCount },
                sendData
              );
              history.push('/dashboard');
            } else if (localStorage.getItem('workout') === 'pushups') {
              localStorage.setItem('pushupCount', this.state.workoutCount);
              axios.post(
                '/api/workouts/',
                { pushups: this.state.workoutCount },
                sendData
              );
              history.push('/dashboard');
            } else if (localStorage.getItem('workout') === 'dips') {
              localStorage.setItem('dipCount', this.state.workoutCount);
              axios.post(
                '/api/workouts/',
                { dips: this.state.workoutCount },
                sendData
              );
              history.push('/dashboard');
            }
            toast.info('Workout Posted!', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          },
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    });
    // if (window.confirm('Are you sure you want to quit now?')) {
    //   const token = window.localStorage.getItem('token');
    //   const sendData = {
    //     headers: {
    //       authorization: token,
    //     },
    //   };
    //   if (localStorage.getItem('workout') === 'squats') {
    //     localStorage.setItem('squatCount', this.state.workoutCount);
    //     axios.post(
    //       '/api/workouts/',
    //       { squats: this.state.workoutCount },
    //       sendData
    //     );
    //     history.push('/dashboard');
    //   } else if (localStorage.getItem('workout') === 'pushups') {
    //     localStorage.setItem('pushupCount', this.state.workoutCount);
    //     axios.post(
    //       '/api/workouts/',
    //       { pushups: this.state.workoutCount },
    //       sendData
    //     );
    //     history.push('/dashboard');
    //   } else if (localStorage.getItem('workout') === 'dips') {
    //     localStorage.setItem('dipCount', this.state.workoutCount);
    //     axios.post(
    //       '/api/workouts/',
    //       { dips: this.state.workoutCount },
    //       sendData
    //     );
    //     history.push('/dashboard');
  }

  componentDidMount() {
    this.intervalId = setInterval(this.counterFunction, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  counterFunction() {
    this.setState({ workoutArr: JSON.parse(localStorage.getItem('position')) });
    let position = this.state.workoutArr;
    let workoutCount = this.state.workoutCount;
    for (let i = 0; i < position.length; i++) {
      if (position[i - 1] === 'down' && position[i] === 'up') {
        position = position.slice(2);
        this.setState({ workoutArr: position });
        this.setState({ workoutCount: workoutCount + 1 });
        localStorage.setItem('position', JSON.stringify(position));
      }
      if (position[i] === 'up') {
        this.setState({ nextPosition: 'Down' });
      } else if (position[i] === 'down') {
        this.setState({ nextPosition: 'Up' });
      } else {
        this.setState({ nextPosition: 'Down' });
      }
    }
  }

  render() {
    return (
      <div id="counter-text">
        {this.state.nextPosition ? (
          <p>
            Next Position: <strong>{this.state.nextPosition}</strong>
          </p>
        ) : (
          <p>Please allow camera to analyze position</p>
        )}

        <button id="counter-button" onClick={this.handleClick}>
          {this.state.workoutCount}
        </button>
      </div>
    );
  }
}

export default Counter;
