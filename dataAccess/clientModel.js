const Sequelize = require('sequelize');
const sequelize = require('./connection');

const Client = sequelize.define('client', {
    _id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    firstContact: {
        type: Sequelize.STRING
    },
    emailType: {
        type: Sequelize.STRING
    },
    sold: {
        type: Sequelize.BOOLEAN
    },
    owner: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
});

// Client.sync();

// let data = require('../src/data.json');
// for (let d of data) {
//     Client.create({
//         _id: d._id,
//         name: d.name,
//         email: d.email,
//         firstContact: d.firstContact,
//         emailType: d.emailType,
//         sold: d.sold,
//         owner: d.owner,
//         country: d.country
//     })
// }

// Client.destroy({
//     where: {_id: 0}
// });
// Client.destroy({
//     where: {name: 'Mor Klein'}
// });
// Client.destroy({
//     where: {name: 'Noam Haim'}
// });
// Client.destroy({
//     where: {name: 'Shir Degani'}
// });
// Client.findAll({
//     where: {name: 'Noam Haim'}
// })
// .then((m)=>{
//     console.log(m._id)
// })


module.exports = Client;