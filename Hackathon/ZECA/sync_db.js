const { sequelize } = require('./db');

(async () => {
    try {
        await sequelize.sync({ force: true }); //WARNING: drops & recreates tables
        console.log('Database synced');
        process.exit(0);
    } catch (err) {
        console.error('Sync error:', err);
        process.exit(1);
    }
})();