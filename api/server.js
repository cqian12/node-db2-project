const express = require("express")
const cars = require('./cars/cars-router')
const server = express()

server.use('/api/cars', cars)

module.exports = server
