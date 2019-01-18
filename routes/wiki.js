const wikiRouter = require('express').Router();
const  addPage  = require('../views/addPage');
const { Page } = require("../models");



wikiRouter.get('/', function(req, res, next){
  res.redirect('/')
})

wikiRouter.post('/', async function(req, res, next){

  const page = new Page ({
    title: req.body.title,
    content: req.body.content,
  })
  try {
    console.log(page)
    await page.save()
    res.redirect('/')
  } catch (error) { next(error) }
})

wikiRouter.get('/add', function(req, res, next){
  res.send(addPage())
})



module.exports = { wikiRouter }