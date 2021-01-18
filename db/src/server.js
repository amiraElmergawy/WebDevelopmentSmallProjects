const express = require('express')
require('./db/mongoose')

const customerRoutes = require('./routes/customers')
const app = express()


const path = require('path')
const hbs = require('hbs')
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../template/views')
const partialsDirectory = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)


const port = process.env.PORT || 3000

app.use(express.static(publicDirectory))
app.use(express.json())
app.use(express.urlencoded());
app.use(customerRoutes)

app.listen(port)