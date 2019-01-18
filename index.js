const morgan = require('morgan');
const express = require('express');
const port = 3000;
const mainPage = require('./views/main')

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res, next){
  res.send(mainPage())
})


app.listen(port, () => console.log(`Wikistack listening on port ${port}!`))