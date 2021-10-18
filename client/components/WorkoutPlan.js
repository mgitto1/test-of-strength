import React from 'react'
import {connect} from 'react-redux'
import history from '../util/history'
import Typical from 'react-typical'
import Quotes from '../util/quotes'
import {Link} from 'react-router-dom'
import {fetchWorkout} from '../store/workouts'

class WorkoutPlan extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getWorkout()
  }

  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '100px'
        }}
      >
        <h1>Page under construcion</h1>
        <h2>Are you interested in getting stronger?</h2>
        <h3>Stay tuned for personalized workout plans</h3>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getWorkout: () => dispatch(fetchWorkout())
  }
}

const mapState = state => {
  return {
    name: state.auth.name,
    isLoggedIn: !!state.auth.id
  }
}

export default connect(mapState, mapDispatch)(WorkoutPlan)
