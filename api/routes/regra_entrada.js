const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const RegraEntrada = require('../models/regra_entrada');

router.get('/', (req, res, next) => {
    RegraEntrada.find()  // RegraEntrada.find() busca por todos os elementos, caso não haja parametros de consulta
    .exec()
    .then(docs => {
        console.log(docs);
//  valida se existem registros a serem motrados ao executar um GET
//        if (docs.length >= 0) {
            res.status(200).json(docs);
//        } else {
//            res.status(404).json({
//                message: 'No entries found'
//            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
});

router.post('/', (req, res, next) => {
    const regra = new RegraEntrada({
        // TODO: Pendente incluir os parametros da regra de entrada
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    regra.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /regra_entrada',
            createdRegraEntrada: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
});

router.get('/:regraId', (req, res, next) => {
    const id = req.params.regraId;
    RegraEntrada.findById(id)
    .exec()
    .then(doc => {
        console.log('from database', doc);
        if (doc) {
            res.status(200).json({doc});
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:regraId', (req, res, next) => {
    const id = req.params.regraId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    RegraEntrada.update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});


router.delete('/:regraId', (req, res, next) => {
    const id = req.params.regraId;
    RegraEntrada.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;