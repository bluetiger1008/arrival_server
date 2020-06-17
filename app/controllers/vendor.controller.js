const db = require("../models");
const Vendor = db.vendors;

// Create and Save a new Vendor
exports.create = (req, res) => {
    // Create a Vendor
    const vendor = {
        name: req.body.name,
    };

    // Save Vendor in the database
    Vendor.create(vendor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the vendor."
            });
        });
};

exports.findVendorById = (id) => {
    return Vendor.findByPk(id, { include: ["products"] })
        .then((vendor) => {
            return vendor;
        })
        .catch((err) => {
            console.log(">> Error while finding vendor: ", err);
        });
};
