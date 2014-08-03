module.exports = function(sequlize, DataType) {
    var Product = sequlize.import(__dirname + "/Product");
    var OrderItem = sequlize.define("OrderItem", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        price: DataType.FLOAT
    });

    OrderItem.belongsTo(Product);
    Product.hasMany(OrderItem);

    return OrderItem;
};