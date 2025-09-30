const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database/racing-db.sqlite',
	logQueryParameters: false,
	benchmark: false,
	logging: false
});

const modelDefiners = [
	require('./models/races.model'),
	require('./models/bets.model'),	
	require('./models/players.model'),	
	require('./models/appstate.model'),
	// require('./models/transactions.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// Sync the database
sequelize.sync();

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;