module.exports = function(sequlize, DataType) {
    var OrderItem = sequlize.import(__dirname + "/OrderItem");
    var Order = sequlize.define("Order", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        receiver: DataType.STRING,
        shippingAddress: DataType.STRING
    });

    OrderItem.belongsTo(Order);
    Order.hasMany(OrderItem);
    return Order;
};