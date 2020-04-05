// Bring in express so we can use it
const express = require('express')
//Bring in Stripe
const stripe = require('stripe')('STRIPE_SECRET_KEY')
// Set up the router
const router = express.Router()

// Bring in our models
const Order = require('./models/Order')

// Test route
// This is accessible via localhost:3000/api/test
// 3000 because that is the port we chose in app.js
// /api because that is where we mounted this router in app.js
// /test because that's what is written right here below
// Anytime someone visits localhost:3000/api/test, we'll run this function
router.get('/test', function (req, res, next) {
  res.send('testing endpoint')
})

/*************
    ORDER
*************/

// GET /orders - Return all of our orders
// This function is marked as an async function so that we can use await inside of it
router.get('/orders', async function (req, res, next) {
  // Look in our database in our Orders collection for any record (This will bring back all records). Wait to find them all before proceeding.
  const allOrders = await Order.find({})
  // Send back all of our orders in the form of JSON
  res.json(allOrders)
})

// GET /orders/id - Return info on a specific order
router.get('/orders/:id', async function (req, res, next) {
  // Get the id from the URL
  const orderID = req.params.id
  // Look in our database in our Orders collection for a record with an _id that matches orderID. Wait to find one before proceeding.
  const oneOrder = await Order.findOne({ _id: orderID })
  // Send that order back in the form of JSON
  res.json(oneOrder)
})

// POST /orders - Create a new order
router.post('/orders', function (req, res, next) {
  // Create a new Order object
  const newOrder = new Order()
  newOrder.customer = req.body.customer
  newOrder.size = req.body.size
  newOrder.toppings = req.body.toppings
  // Set the order as pending because we have not yet started it
  newOrder.status = 'pending'
  newOrder.price = req.body.price
  newOrder.save()
  // Send back the HTTP 200 response. This means all good. 👍
  res.sendStatus(200)
})

// PUT /orders/id - Update an order
router.put('/orders/:id', async function (req, res, next) {
  // Get the id from the URL ^ :id
  const orderID = req.params.id
  // Look for an order with the _id of orderID, then update it to be whatever we sent in the body of our request.
  // We put await in front of it to make sure it waits to finish before moving on to the next line of code.
  let updateOrder = await Order.updateOne({ _id: orderID }, req.body)
  // Send back the HTTP 200 response. This means all good. 👍
  res.sendStatus(200)
})

router.post('/checkout', function (req, res, next) {
  const BASE_PRICE = 12.0
  const COST_PER_INGREDIENT = 0.5

  let pizza_price = BASE_PRICE
  const ingredients = req.body.toppings
  pizza_price += ingredients.length * COST_PER_INGREDIENT

  console.log(pizza_price, req.body)

  stripe.charges.create(
    {
      amount: pizza_price * 100, // This is in cents, so x 100
      currency: 'usd',
      source: req.body.token,
      description: 'Pizzilla Pizza for ' + req.body.customer,
    },
    function (err, charge) {
      if (err) {
        console.log(err)
        res.status(400).send(err)
        return
      }
      res.status(200).send(charge)
    }
  )
})

// Export the router for use in other files
module.exports = router
