const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // change path if needed
    logging: false,
});

const Transaction = sequelize.define('transaction', {
    txid: {
        type: DataTypes.STRING,
        allowNull: false,
        primareKey: true,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    memo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

async function init() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
    } catch (err) {
        console.error('Unable to connect to Database.', err);
    }
}

module.exports = { sequelize, Transaction, init };

