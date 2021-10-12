import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Quotes from '../../util/quotes';
import { fetchWorkout } from '../../store/workouts';
import Bar from './Bar';
import Tiles from './Tiles';
import dateformat from 'dateformat';
import { percentRank } from '../../util/utilities';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSquatNums: [],
      allPushupNums: [],
      allDipNums: [],
      maxSquat: 0,
      maxPushup: 0,
      maxDip: 0,
    };
    this.calculate = this.calculate.bind(this);
    this.percentRank = percentRank.bind(this);
  }
  componentDidMount() {
    this.props.getWorkout();
    this.calculate();
    this.calculateRank();
  }

  async calculateRank() {
    const { data: workout } = await axios.get('/api/workouts');
    if (workout.length) {
      let squatRank = [];
      let pushupRank = [];
      let dipRank = [];
      for (let i = 0; i < workout.length; i++) {
        squatRank.push(workout[i].squats);
        pushupRank.push(workout[i].pushups);
        dipRank.push(workout[i].dips);
      }
      squatRank.sort((a, b) => a - b);
      pushupRank.sort((a, b) => a - b);
      dipRank.sort((a, b) => a - b);
      this.setState({ allSquatNums: squatRank });
      this.setState({ allPushupNums: pushupRank });
      this.setState({ allDipNums: dipRank });
    }
  }

  async calculate() {
    let maxSquats = 0;
    let maxPushups = 0;
    let maxDips = 0;
    const workoutArr = this.props.workout || [];
    if (workoutArr.length) {
      let squatVals = [];
      let pushupVals = [];
      let dipVals = [];
      for (let i = 0; i < workoutArr.length; i++) {
        squatVals.push(workoutArr[i].squats);
        pushupVals.push(workoutArr[i].pushups);
        dipVals.push(workoutArr[i].dips);
      }
      maxSquats = Math.max(...squatVals);
      maxPushups = Math.max(...pushupVals);
      maxDips = Math.max(...dipVals);
      this.setState({ maxSquat: maxSquats });
      this.setState({ maxPushup: maxPushups });
      this.setState({ maxDip: maxDips });
    }
  }

  render() {
    const activityLog = this.props.workout.reverse();
    const { maxSquat } = this.state || 0;
    return (
      <div id="dashboard">
        <Tiles />
        <div id="content">
          <div id="user-info">
            <h3>Welcome</h3>
            <h1>{this.props.name}</h1>
            <div>
              <i>
                <Quotes />
              </i>
              {this.props.name ? (
                ' '
              ) : (
                <p>
                  <Link to="/login" style={{ color: 'blue' }}>
                    Log in{' '}
                  </Link>
                  or{' '}
                  <Link to="/signup" style={{ color: 'blue' }}>
                    Sign up{' '}
                  </Link>
                  to save your results
                </p>
              )}
            </div>
          </div>
          <div id="test-results">
            <h1>Results</h1>
            <i>
              If your latest results don't show up redirect to the home page and
              come back to see them!
            </i>
            <br />
            <table id="table-text">
              <tbody>
                <tr>
                  <th>Test</th>
                  <th>Actions</th>
                  <th>{this.props.name ? 'High' : 'Latest'} Score</th>
                  <th>Percentile</th>
                </tr>
                <tr id="odd-row">
                  <th>Squats</th>
                  <th>
                    <Link to="/squats" style={{ color: 'blue' }}>
                      Play
                    </Link>
                  </th>
                  {this.props.name ? (
                    <th>{maxSquat ? maxSquat : '?'}</th>
                  ) : (
                    <th>
                      {Number(localStorage.getItem('squatCount'))
                        ? Number(localStorage.getItem('squatCount'))
                        : '?'}
                    </th>
                  )}
                  {this.props.name ? (
                    <th>
                      <Bar
                        bgcolor={
                          this.percentRank(
                            this.state.allSquatNums,
                            this.state.maxSquat
                          ) <= 0.25
                            ? 'red'
                            : this.percentRank(
                                this.state.allSquatNums,
                                this.state.maxSquat
                              ) > 0.25 &&
                              this.percentRank(
                                this.state.allSquatNums,
                                this.state.maxSquat
                              ) <= 0.75
                            ? 'goldenrod'
                            : this.percentRank(
                                this.state.allSquatNums,
                                this.state.maxSquat
                              ) > 0.75
                            ? 'green'
                            : '#e0e0de'
                        }
                        completed={
                          this.percentRank(
                            this.state.allSquatNums,
                            this.state.maxSquat
                          )
                            ? (
                                this.percentRank(
                                  this.state.allSquatNums,
                                  this.state.maxSquat
                                ) * 100
                              ).toFixed(2)
                            : '?'
                        }
                      />
                    </th>
                  ) : (
                    <th>
                      <Bar
                        bgcolor={
                          this.percentRank(
                            this.state.allSquatNums,
                            Number(localStorage.getItem('squatCount'))
                          ) <= 0.25
                            ? 'red'
                            : this.percentRank(
                                this.state.allSquatNums,
                                Number(localStorage.getItem('squatCount'))
                              ) > 0.25 &&
                              this.percentRank(
                                this.state.allSquatNums,
                                Number(localStorage.getItem('squatCount'))
                              ) <= 0.75
                            ? 'goldenrod'
                            : this.percentRank(
                                this.state.allSquatNums,
                                Number(localStorage.getItem('squatCount'))
                              ) > 0.75
                            ? 'green'
                            : '#e0e0de'
                        }
                        completed={
                          this.percentRank(
                            this.state.allSquatNums,
                            Number(localStorage.getItem('squatCount'))
                          )
                            ? (
                                this.percentRank(
                                  this.state.allSquatNums,
                                  Number(localStorage.getItem('squatCount'))
                                ) * 100
                              ).toFixed(2)
                            : '?'
                        }
                      />
                    </th>
                  )}
                </tr>
                <tr>
                  <th>Pushups</th>
                  <th>
                    <Link to="/pushups" style={{ color: 'blue' }}>
                      Play
                    </Link>
                  </th>
                  {this.props.name ? (
                    <th>{this.state.maxPushup ? this.state.maxPushup : '?'}</th>
                  ) : (
                    <th>
                      {Number(localStorage.getItem('pushupCount'))
                        ? Number(localStorage.getItem('pushupCount'))
                        : '?'}
                    </th>
                  )}
                  {this.props.name ? (
                    <th>
                      <Bar
                        bgcolor={
                          this.percentRank(
                            this.state.allPushupNums,
                            this.state.maxPushup
                          ) <= 0.25
                            ? 'red'
                            : this.percentRank(
                                this.state.allPushupNums,
                                this.state.maxPushup
                              ) > 0.25 &&
                              this.percentRank(
                                this.state.allPushupNums,
                                this.state.maxPushup
                              ) <= 0.75
                            ? 'goldenrod'
                            : this.percentRank(
                                this.state.allPushupNums,
                                this.state.maxPushup
                              ) > 0.75
                            ? 'green'
                            : '#e0e0de'
                        }
                        completed={
                          this.percentRank(
                            this.state.allPushupNums,
                            this.state.maxPushup
                          )
                            ? (
                                this.percentRank(
                                  this.state.allPushupNums,
                                  this.state.maxPushup
                                ) * 100
                              ).toFixed(2)
                            : '?'
                        }
                      />
                    </th>
                  ) : (
                    <th>
                      <Bar
                        bgcolor={
                          this.percentRank(
                            this.state.allPushupNums,
                            Number(localStorage.getItem('pushupCount'))
                          ) <= 0.25
                            ? 'red'
                            : this.percentRank(
                                this.state.allPushupNums,
                                Number(localStorage.getItem('pushupCount'))
                              ) > 0.25 &&
                              this.percentRank(
                                this.state.allPushupNums,
                                Number(localStorage.getItem('pushupCount'))
                              ) <= 0.75
                            ? 'goldenrod'
                            : this.percentRank(
                                this.state.allPushupNums,
                                Number(localStorage.getItem('pushupCount'))
                              ) > 0.75
                            ? 'green'
                            : '#e0e0de'
                        }
                        completed={
                          this.percentRank(
                            this.state.allPushupNums,
                            Number(localStorage.getItem('pushupCount'))
                          )
                            ? (
                                this.percentRank(
                                  this.state.allPushupNums,
                                  Number(localStorage.getItem('pushupCount'))
                                ) * 100
                              ).toFixed(2)
                            : '?'
                        }
                      />
                    </th>
                  )}
                </tr>
                <tr id="odd-row">
                  <th>Dips</th>
                  <th>
                    <Link to="/dips" style={{ color: 'blue' }}>
                      Play
                    </Link>
                  </th>
                  {this.props.name ? (
                    <th>{this.state.maxDip ? this.state.maxDip : '?'}</th>
                  ) : (
                    <th>
                      {Number(localStorage.getItem('dipCount'))
                        ? Number(localStorage.getItem('dipCount'))
                        : '?'}
                    </th>
                  )}
                  {this.props.name ? (
                    <th>
                      <Bar
                        bgcolor={
                          this.percentRank(
                            this.state.allDipNums,
                            this.state.maxDip
                          ) <= 0.25
                            ? 'red'
                            : this.percentRank(
                                this.state.allDipNums,
                                this.state.maxDip
                              ) > 0.25 &&
                              this.percentRank(
                                this.state.allDipNums,
                                this.state.maxDip
                              ) <= 0.75
                            ? 'goldenrod'
                            : this.percentRank(
                                this.state.allDipNums,
                                this.state.maxDip
                              ) > 0.75
                            ? 'green'
                            : '#e0e0de'
                        }
                        completed={
                          this.percentRank(
                            this.state.allDipNums,
                            this.state.maxDip
                          )
                            ? (
                                this.percentRank(
                                  this.state.allDipNums,
                                  this.state.maxDip
                                ) * 100
                              ).toFixed(2)
                            : '?'
                        }
                      />
                    </th>
                  ) : (
                    <th>
                      <Bar
                        bgcolor={
                          this.percentRank(
                            this.state.allDipNums,
                            Number(localStorage.getItem('dipCount'))
                          ) <= 0.25
                            ? 'red'
                            : this.percentRank(
                                this.state.allDipNums,
                                Number(localStorage.getItem('dipCount'))
                              ) > 0.25 &&
                              this.percentRank(
                                this.state.allDipNums,
                                Number(localStorage.getItem('dipCount'))
                              ) <= 0.75
                            ? 'goldenrod'
                            : this.percentRank(
                                this.state.allDipNums,
                                Number(localStorage.getItem('dipCount'))
                              ) > 0.75
                            ? 'green'
                            : '#e0e0de'
                        }
                        completed={
                          this.percentRank(
                            this.state.allDipNums,
                            Number(localStorage.getItem('dipCount'))
                          )
                            ? (
                                this.percentRank(
                                  this.state.allDipNums,
                                  Number(localStorage.getItem('dipCount'))
                                ) * 100
                              ).toFixed(2)
                            : '?'
                        }
                      />
                    </th>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div id="activity-log">
            <h1>Activity log</h1>
            {this.props.name ? (
              <table id="table-text">
                <tbody>
                  <tr>
                    <th>Test</th>
                    <th>Date</th>
                    <th>Score</th>
                  </tr>
                  {activityLog.map((workout) => {
                    return (
                      <tr key={workout.id}>
                        <th>
                          {workout.squats
                            ? 'Squats'
                            : workout.pushups
                            ? 'Pushups'
                            : workout.dips
                            ? 'Dips'
                            : 'No repititions recorded'}
                        </th>
                        <th>{dateformat(workout.createdAt)}</th>
                        <th>
                          {workout.squats
                            ? workout.squats
                            : workout.pushups
                            ? workout.pushups
                            : workout.dips
                            ? workout.dips
                            : ''}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <i>Please log in or sign up to see activity log.</i>
            )}
          </div>
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
    workout: state.workouts,
  };
};

export default connect(mapState, mapDispatch)(Dashboard);
