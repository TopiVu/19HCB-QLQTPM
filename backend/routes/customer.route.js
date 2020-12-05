const express = require('express');
const router = express.Router();
const customerModel = require('../model/customer.model')

router.get('/', (req, res) => {
    customerModel.getAll().then(data => {
        res.json(data);
    });
});

module.exports = router;
