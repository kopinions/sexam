module.exports = function(sequlize, DataType) {
    var Order = sequlize.define("Order", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        receiver: DataType.STRING,
        shippingAddress: DataType.STRING
    });
    return Order;
};