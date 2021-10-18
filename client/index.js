import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Router} from 'react-router-dom'
import history from './util/history'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
