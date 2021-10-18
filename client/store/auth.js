import axios from 'axios'
import history from '../util/history'

const PORT = process.env.PORT || 8080
const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      proxy: {
        host: 'localhost',
        port: PORT
      },
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    const token = window.localStorage.getItem('token')
    const localSquats =
      Number(window.localStorage.getItem('squatCount')) || null
    const localPushups =
      Number(window.localStorage.getItem('pushupCount')) || null
    const localDip = Number(window.localStorage.getItem('dipCount')) || null
    const sendData = {
      headers: {
        authorization: token
      }
    }
    if (localPushups || localDip || localSquats) {
      axios.post(
        '/api/workouts/',
        {
          squats: localSquats,
          pushups: localPushups,
          dips: localDip
        },
        sendData
      )
    }
    history.push('/')
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const authenticateSignup = (
  username,
  password,
  method,
  name
) => async dispatch => {
  try {
    const res = await axios.post(`/auth/signup`, {
      username,
      password,
      name
    })
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    const token = window.localStorage.getItem('token')
    const localSquats =
      Number(window.localStorage.getItem('squatCount')) || null
    const localPushups =
      Number(window.localStorage.getItem('pushupCount')) || null
    const localDip = Number(window.localStorage.getItem('dipCount')) || null
    const sendData = {
      headers: {
        authorization: token
      }
    }
    if (localPushups || localDip || localSquats) {
      axios.post(
        '/api/workouts/',
        {
          squats: localSquats,
          pushups: localPushups,
          dips: localDip
        },
        sendData
      )
    }
    history.push('/')
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  localStorage.removeItem('dipCount')
  localStorage.removeItem('squatCount')
  localStorage.removeItem('pushupCount')
  localStorage.removeItem('workout')
  localStorage.removeItem('position')
  window.location.reload()
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
