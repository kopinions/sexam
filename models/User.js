module.exports = function(sequlize, DataType) {

    var Order = sequlize.import(__dirname + "/Order");
    var User = sequlize.define("User", {
        name: DataType.STRING,
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });

    Order.belongsTo(User);
    User.hasMany(Order);

    return User;
};