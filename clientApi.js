// export to the server
// import the model
const express = require('express');
const router = express.Router();
const Client = require('./dataAccess/clientModel');

router.get('/clients', (req, res) => {
    Client.findAll({}).then((clients) => {
        res.send(clients);
    })
});

router.put('/clients/:id', (req, res) => {
    let values = req.body.client
    let selector = {
        where: { _id: req.params.id }
    }
    Client.update(values, selector).then(function (data) {
        res.send(data)
    })
});

router.post('/addClient', (req,res)=>{
    let newC = req.body.client;
    Client.create(newC);
    res.send(newC);
})

router.get('/actions', (req, res) => {
    Client.findAll({
        attributes: ['_id', 'owner', 'name']
    }).then((owners) => {
        res.send(owners)
    })
});

router.delete('/clients/:id', (req,res)=>{
    let id = req.params.id;
    // let id = req.body.client._id;
    console.log(id)
    Client.destroy({where: {_id: id}}).then((data)=>{
        res.send(data);
    })
})

module.exports = router