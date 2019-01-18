const morgan = require('morgan');
const express = require('express');
const port = 3000;
const mainPage = require('./views/main')
const { db, Page, User } = require('./models')

const app = express()

app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res, next){
  res.send(mainPage())
})

async function Start() {
  try {
    const page = await Page.sync();
    const user = await User.sync();

    app.listen(port, () => console.log(`Wikistack listening on port ${port}!`))
  } catch (error) {
    console.log(`DATABASE SYNC ERROR: ${error}`);
  }
}

Start();
