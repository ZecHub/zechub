const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('state', {
		txid: {
			allowNull: false,			
			type: DataTypes.STRING,			
		}
	});
};