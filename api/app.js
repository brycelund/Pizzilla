/*
    Bring in the frameworks we need
*/
const express = require('express')
const mongoose = require('mongoose')

/*
    Setup express app
*/
const app = express()
const port = 3000

/*
    Bring in the routes
*/
const routes = require('./routes.js')

/*
    Tell express to use the routes we just brough in
    Mount those routes on the /api endpoint
*/
app.use('/api', routes)

/*
    Tell express to listen on port 3000
*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
