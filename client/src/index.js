import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals' // look up what this does
import { Provider } from 'react-redux'
import { restoreCSRF } from './store/csrf'
// import { BrowserRouter } from 'react-reouter-dom'
// import { combineReducers } from 'redux'

import App from './App'
import './index.css'
import configureStore from './store'

// need to do a few things to make dev server/client work
const store = configureStore()
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF() // get the XSRF token on every client start
  window.store = store // add store to window for Redux dev tools
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
