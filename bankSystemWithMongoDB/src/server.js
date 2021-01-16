const path = require('path')
const hbs = require('hbs')
const express = require('express')
const port = 3000

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../template/views')
const partialsDirectory = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
    res.render('index')
})


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})