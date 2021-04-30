import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    const dummyInfo = {
      name: 'tester',
      squats: 10,
      pushups: 40,
      situps: 20,
      percentile: 80,
    };
    return (
      <div id="dashboard">
        <div id="user-info">
          <h3>Username</h3>
          <h2>{dummyInfo.name}</h2>
          <p>Log in or Sign up to save your results</p>
        </div>
        <div id="test-results">
          <h1>Test Results</h1>
          <table>
            <tbody>
              <tr>
                <th>Test</th>
                <th>Actions</th>
                <th>Score</th>
                <th>Percentile</th>
              </tr>
              <tr>
                <th>Squats</th>
                <th>
                  <Link to="/squats">Play</Link>
                </th>
                <th>{dummyInfo.squats ? dummyInfo.squats : '?'}</th>
                <th>{dummyInfo.percentile}%</th>
              </tr>
              <tr>
                <th>Pushups</th>
                <th>
                  <Link to="/squats">Play</Link>
                </th>
                <th>{dummyInfo.pushups ? dummyInfo.pushups : '?'}</th>
                <th>{dummyInfo.percentile}%</th>
              </tr>
              <tr>
                <th>Situps</th>
                <th>
                  <Link to="/squats">Play</Link>
                </th>
                <th>{dummyInfo.situps ? dummyInfo.situps : '?'}</th>
                <th>{dummyInfo.percentile}%</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;
