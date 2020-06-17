const dbConfig = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./products.model.js")(sequelize, Sequelize)
db.brands = require("./brands.model.js")(sequelize, Sequelize)
db.vendors = require("./vendors.model.js")(sequelize, Sequelize)

db.brands.hasMany(db.products, { as: "products" })
db.products.belongsTo(db.brands, {
  foreignKey: "brandId",
  as: "brand",
})

db.vendors.hasMany(db.products, { as: "products" })
db.products.belongsTo(db.vendors, {
  foreignKey: "vendorId",
  as: "vendor",
})

module.exports = db
