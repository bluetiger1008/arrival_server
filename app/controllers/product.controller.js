const db = require("../models")
const Product = db.products
const Op = db.Sequelize.Op

const getPagination = (page, size) => {
  const limit = size ? +size : 10
  const offset = page ? page * limit : 0

  return { limit, offset }
}

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: products } = data
  const currentPage = page ? +page : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, products, totalPages, currentPage }
}

// Create and Save a new Product
exports.create = (req, res) => {
  // Create a Product
  const product = {
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    tag: req.body.tag,
    price: req.body.price,
    quantity: req.body.quantity,
    active: req.body.active,
    brandId: req.body.brandId,
  }

  // Save Product in the database
  Product.create(product)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      })
    })
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query

  const { limit, offset } = getPagination(page, size)

  Product.findAndCountAll({ limit, offset, include: ["brand", "vendor"] })
    .then((data) => {
      const response = getPagingData(data, page, limit)
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      })
    })
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Product.findByPk(id, { include: ["brand", "vendor"] })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id,
      })
    })
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      })
    })
}

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      })
    })
}

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Product were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products.",
      })
    })
}
