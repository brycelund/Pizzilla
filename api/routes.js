// Bring in express
const express = require('express')
// Set up the router
const router = express.Router()

// Bring in our models
const Order = require('./models/Order')
const Customer = require('./models/Customer')

// Test route
router.get('/test', function(req, res, next) {
  res.send('testing endpoint')
})

/*************
    ORDER
*************/

// GET /orders - Return all of our orders
router.get('/orders', async function(req, res, next) {
  const allOrders = await Order.find({})
  res.json(allOrders)
})

// GET /orders/id - Return info on a specific order
router.get('/orders/:id', async function(req, res, next) {
  const orderID = req.params.id
  const oneOrder = await Order.findOne({ _id: orderID })
  res.json(oneOrder)
})

// POST /orders - Create a new order
router.post('/orders', function(req, res, next) {
  const newOrder = new Order()
  newOrder.size = req.body.size
  newOrder.toppings = req.body.toppings
  newOrder.status = 'pending'
  newOrder.price = req.body.price
  newOrder.save()
  res.sendStatus(200)
})

// PUT /orders/id - Update an order
router.put('/orders/:id', async function(req, res, next) {
  const orderID = req.params.id
  let updateOrder = await Order.updateOne({ _id: orderID }, req.body)
  res.sendStatus(200)
})

/*************
    CUSTOMER
*************/

// GET /orders - Return info on a specific order
router.get('/orders', async function(req, res, next) {
  const oneOrder = await Order.findOne({ _id: orderID })
  res.json(oneOrder)
})

// POST /customers - Add a customer
router.post('/customers', function(req, res, next) {
  const newCustomer = new Customer()
  newCustomer.name = req.body.name
  newCustomer.email = req.body.email
  newCustomer.save()
  res.sendStatus(200)
})

// Export the router for use in other files
module.exports = router
