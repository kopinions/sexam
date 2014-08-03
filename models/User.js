module.exports = function(sequlize, DataType) {
    var User = sequlize.define("User", {
        name: DataType.STRING,
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });
    return User;
};