module.exports = (sequelize, Sequelize) => {
    const Vendor = sequelize.define("vendor", {
        name: {
            type: Sequelize.STRING
        },
    });

    return Vendor;
};
