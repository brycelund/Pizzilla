//Bring in the frameworks we need
const express = require('express')
const mongoose = require('mongoose')

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://pizzaman:ZrWD6I03zhdNieiY@pizzilla-m9xet.mongodb.net/pizzdb?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

// Setup express app
const app = express()
const port = 3000

// Add middleware
app.use(express.json())

// Bring in the routes
const routes = require('./routes.js')

// Tell express to use the routes we just brough in
// Mount those routes on the /api endpoint.
app.use('/api', routes)

// Tell express to listen on port 3000
app.listen(port, () => console.log(`Pizzilla api listening on port ${port}`))
