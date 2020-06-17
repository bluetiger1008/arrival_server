module.exports = (app) => {
  const brands = require("../controllers/brand.controller.js")

  var router = require("express").Router()

  router.post("/", brands.create)
  router.get("/:id", brands.findBrandById)

  app.use("/api/brands", router)
}
