import React, { useState } from 'react'
import { Button } from 'reactstrap'
import { Link, useHistory } from 'react-router-dom'
import PizzaBuilder from './PizzaBuilder'
import StripeCheckout from 'react-stripe-checkout'

import axios from 'axios'

export default function OrderPage(props) {
  // Get the history so we can navigate
  const history = useHistory()

  // Set up our state
  const [selectedToppings, selectToppings] = useState([])
  const [done, setDone] = useState(false)

  // We clicked Order Pizza and we're now going to send it to our server
  function submitPizza() {
    // Get the customer name that we passed over from our CustomerPage
    const customerName = props.location.data.customerName
    let host = window.location.origin
    host = host.replace(/:[0-9]+\/?/gi, '')
    axios.post(`${host}:3001/api/orders`, {
      customer: customerName,
      size: 12,
      toppings: selectedToppings,
      price: 15.99,
    })
    setDone(true)
  }

  function onToken(token) {
    const customerName = props.location.data.customerName
    let host = window.location.origin
    host = host.replace(/:[0-9]+\/?/gi, '')
    axios
      .post(`${host}:3001/api/checkout`, {
        token: token.id,
        size: 12,
        toppings: selectedToppings,
        customer: customerName,
      })
      .then((response) => {
        submitPizza()
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  // Handle what happens when you click an ingredient button
  function toppingClick(ing) {
    let newArray = addOrRemove(selectedToppings, ing)
    selectToppings(newArray)
  }

  // Found this on stack overflow. It will toggle an item in an array. (add it, or remove it)
  const addOrRemove = (arr, item) => (arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item])

  // This will tell us what color our button should be based on if the topping is selected or not
  function buttonColor(ing) {
    if (selectedToppings.includes(ing)) {
      return 'danger'
    } else {
      return 'secondary'
    }
  }

  // If we have submitted our pizza, then say thanks instead of show the order page
  if (done) {
    // Wait two seconds, then go back to the main screen
    setTimeout(() => {
      setDone(false)
      history.push('/customer')
    }, 2000)
    return (
      <div className='content'>
        <h1>Thanks!</h1>
      </div>
    )
  }

  return (
    <div className='orderPage'>
      <div className='pizzaView'>
        <PizzaBuilder toppings={selectedToppings} />
      </div>

      <div className='orderOptions'>
        <h3 className='py-3'>Select Pizza Options</h3>
        <div>
          <Button onClick={() => toppingClick('cheese')} color={buttonColor('cheese')}>
            Cheese
          </Button>
          <Button onClick={() => toppingClick('pepperoni')} color={buttonColor('pepperoni')}>
            Pepperoni
          </Button>
          <Button onClick={() => toppingClick('olives')} color={buttonColor('olives')}>
            Olives
          </Button>
          <Button onClick={() => toppingClick('mushrooms')} color={buttonColor('mushrooms')}>
            Mushrooms
          </Button>
          <Button onClick={() => toppingClick('ham')} color={buttonColor('ham')}>
            Ham
          </Button>
          <Button onClick={() => toppingClick('onions')} color={buttonColor('onions')}>
            Onions
          </Button>
          <Button onClick={() => toppingClick('basil')} color={buttonColor('basil')}>
            Basil
          </Button>
        </div>
        <div className=''>
          <StripeCheckout token={onToken} stripeKey='pk_test_c3YBzRWA3ju0YiJHTzetcqDB' className='my-3 btn-block' />
          <Link to='/customer'>
            <Button color='secondary' size='lg' className='btn-block my-3'>
              Start Over
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
