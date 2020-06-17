module.exports = (app) => {
  const vendors = require("../controllers/vendor.controller.js")

  var router = require("express").Router()

  router.post("/", vendors.create)
  router.get("/:id", vendors.findVVendorById)

  app.use("/api/vendors", router)
}
