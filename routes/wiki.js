const wikiRouter = require('express').Router();
const  addPage  = require('../views/addPage');
const { Page } = require('../models');
const wikipage = require('../views/wikipage');

wikiRouter.get('/', function(req, res, next){
  res.redirect('/')
})

wikiRouter.post('/', async function(req, res, next){

  const page = new Page ({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  })
  try {
    console.log(page)
    await page.save()
    let slug = page.dataValues.slug
    res.redirect(`/wiki/${slug}`)
  } catch (error) { next(error) }
})

wikiRouter.get('/add', function(req, res, next){
  res.send(addPage())
})

wikiRouter.get('/:slug', async function(req, res, next) {
  try {
    let page = await Page.findOne({where: { slug: req.params.slug }})
    res.send(wikipage(page))
  } catch (error) { console.log(error) }
})


module.exports = { wikiRouter }