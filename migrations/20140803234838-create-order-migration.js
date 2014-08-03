module.exports = {
  up: function(migration, DataTypes, done) {
      migration.createTable('Orders', {
          id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          receiver: DataTypes.STRING,
          shippingAddress:DataTypes.STRING,
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE
      });
      done();
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
