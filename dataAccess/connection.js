const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION || 'mysql://sql7263189:8QXBVBnXgL@sql7.freesqldatabase.com/sql7263189');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
