const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('players', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		address: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		code: {
			allowNull: false,
			type: DataTypes.STRING,			
		},
        verified: {
			default: false,
            type: DataTypes.BOOLEAN
        }
	});
};