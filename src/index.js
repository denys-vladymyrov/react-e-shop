import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { Elements } from "@stripe/react-stripe-js"

import App from './App'
import { store } from './store/store'
import { stripePromise } from './utils/stripe/stripe.utils'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Elements>
    </Provider>
  </React.StrictMode>
);

