const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
  operatorsAliases: false,
  /* logging: false; */
});

db.authenticate().then(() => {
  console.log("connected to db")
});

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: Sequelize.ENUM('open', 'closed')
});

const generateSlug = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate((pageInstance, optionsObject) => {
  pageInstance.dataValues.slug = generateSlug(pageInstance.dataValues.title)
})

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false }
});


Page.belongsTo(User, { as: 'author'})

module.exports = {
  db, Page, User
}