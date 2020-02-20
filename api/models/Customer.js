// Require mongoose
const mongoose = require('mongoose')

// Set up our schema
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String
})

// Compile model from schema
const Customer = mongoose.model('Customer', CustomerSchema)

// Export the model from this file so we can use it in our other files
module.exports = Customer
