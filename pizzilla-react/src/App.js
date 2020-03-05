import React from 'react'
import logo from './logo.svg'
import './App.css'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import CustomerPage from './components/CustomerPage'
import OrderPage from './components/OrderPage'
import KitchenPage from './components/KitchenPage'

function App() {
  return (
    <div>
      <div className='header'>
        <img src='./images/PizzillaLogo.png' className='topLogo' />
      </div>
      <Router>
        <Switch>
          <Route path='/customer' component={CustomerPage} />
          <Route path='/order' component={OrderPage} />
          <Route path='/kitchen' component={KitchenPage} />
          <Route exact path='/' render={() => <Redirect to='/customer' />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
