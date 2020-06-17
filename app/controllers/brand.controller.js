const db = require("../models");
const Brand = db.brands;

// Create and Save a new Brand
exports.create = (req, res) => {
    // Create a Brand
    const brand = {
        name: req.body.name,
    };

    // Save Brand in the database
    Brand.create(brand)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the brand."
            });
        });
};

exports.findBrandById = (id) => {
    return Brand.findByPk(id, { include: ["products"] })
        .then((brand) => {
            return brand;
        })
        .catch((err) => {
            console.log(">> Error while finding brand: ", err);
        });
};
