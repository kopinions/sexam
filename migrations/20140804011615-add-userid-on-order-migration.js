module.exports = {
    up: function (migration, DataTypes, done) {
        migration.addColumn('Orders', "UserId",
            {
                type: DataTypes.INTEGER,
                referenceKey: "id",
                referencesTable: "Users"
            }
        );
        done();
    },
    down: function (migration, DataTypes, done) {
        // add reverting commands here, calling 'done' when finished
        done();
    }
};
