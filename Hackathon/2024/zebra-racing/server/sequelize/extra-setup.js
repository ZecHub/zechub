function applyExtraSetup(sequelize) {
	const { players, bets, races } = sequelize.models;
	
	// Create client/address association
	// races.hasMany(bets);
	players.hasMany(bets);
	bets.belongsTo(players);
}

module.exports = { applyExtraSetup };