const wikiRouter = require('express').Router();
const  addPage  = require('../views/addPage');
const { Page, User } = require('../models');
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
    const user = await User.findOrCreate({ where: {name: req.body.name, email: req.body.email }})
    // console.log('The name of the new user is: ', user[0].dataValues.name)
    page.dataValues.authorId = user[0].dataValues.id
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