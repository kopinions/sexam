module.exports = function(sequlize, DataType) {
    var Product = sequlize.define("Product", {
        name: DataType.STRING,
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        price: DataType.FLOAT
    });
    return Product;
};