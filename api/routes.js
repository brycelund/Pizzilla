// Bring in express
const express = require('express')
// Set up the router
const router = express.Router()

router.get('/test', function(req, res, next) {
  res.send('testing endpoint')
})

module.exports = router
