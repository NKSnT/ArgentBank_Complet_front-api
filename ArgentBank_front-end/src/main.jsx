//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'

import store from 'src/app/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
