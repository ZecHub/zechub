const { DataTypes, DATE } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('bets', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		amount: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		zebra: {
			allowNull: false,
			type: DataTypes.INTEGER,			
		},
		new: {
			allowNull: false,
			default: true,
			type: DataTypes.BOOLEAN,
		},
		raceId: {
			allowNull: false,
			type: DataTypes.INTEGER,			
		},
		txid: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		}
	});
};