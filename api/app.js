//Bring in the frameworks we need
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

//Set up default mongoose connection
// You get this string from your mongodb account by clicking connect. Replace the url and the username and password in the string
var mongoDB = 'mongodb+srv://pizzaman:ZrWD6I03zhdNieiY@pizzilla-m9xet.mongodb.net/pizzdb?retryWrites=true&w=majority'

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

// Setup express app
const app = express()
const port = 3001

// Add middleware
// This tells express to parse any request body like POST or PUT so we can use it
app.use(express.json())
// This tells express to let us access our api from on the same origin (localhost)
app.use(cors())

// Bring in the routes
const routes = require('./routes.js')

// Tell express to use the routes we just brough in
// Mount those routes onto the /api endpoint.
app.use('/api', routes)

// Tell express to listen on port 3000 (That we specified above)
// Once we are listening, output the message
app.listen(port, () => {
  console.log(`Pizzilla api listening on port ${port}`)
})
