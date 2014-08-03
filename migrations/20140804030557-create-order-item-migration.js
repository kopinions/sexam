module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('OrderItems', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            OrderId: DataTypes.INTEGER,
            ProductId: DataTypes.INTEGER
        });
        done()
    },
    down: function (migration, DataTypes, done) {
        // add reverting commands here, calling 'done' when finished
        done()
    }
};
