import axios from 'axios';
import history from '../history';

const SET_WORKOUT = 'SET_WORKOUT';

export const setWorkout = (workout) => ({
  type: SET_WORKOUT,
  workout,
});

export const fetchWorkout = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const sendData = {
          headers: {
            authorization: token,
          },
        };
        const { data: workout } = await axios.get(
          '/api/workouts/user',
          sendData
        );
        dispatch(setWorkout(workout));
      }
      // } else {
      //   let workout = localStorage.getItem('workout');
      //   dispatch(setCart(JSON.parse(cart)));
      // }
    } catch (error) {
      console.log('Error fetching workouts from server');
    }
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (workout = [], action) {
  switch (action.type) {
    case SET_WORKOUT:
      return action.workout;
    default:
      return workout;
  }
}
