module.exports = (sequelize, Sequelize) => {
  // const Brand = require('./brands.model')(sequelize, Sequelize);
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.TEXT,
    },
    tag: {
      type: Sequelize.TEXT,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  })

  return Product
}
