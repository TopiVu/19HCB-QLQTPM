var express = require('express');
var router = express.Router();
var validation = require('../middlewares/validate.mdw');
var touristPackageModel = require('../models/tourist_package.model');
var constant = require('../utils/globals');

router.get('/', function (req, res, next) {
  res.render('index', { page: 'components/touristPackage/index' });
});

router.get('/new', function (req, res, next) {
  res.render('index', { page: 'components/touristPackage/new' });
});

router.get('/:id/show', function (req, res, next) {
  res.render('index', { page: 'components/touristPackage/show' });
});

router.get('/findByName', validation(require('../schemas/searchCommon.json')), function (req, res, next) {
  var searchString = req.body.search || '';
  touristPackageModel.findByName(searchString).then(touristPackages => {
    res.json({
      data: touristPackages
    });
  }).catch(err => {
    res.status(500).json({
      message: constant.ERROR_API_MESSAGE,
      error: err
    })
  })
});

router.get('/details/:id', function (req, res) {
  const tour_id = req.params.id;

  touristPackageModel.findById(tour_id).then(tourist_package => {
    res.json({
      data: tourist_package
    });
  }).catch(err => {
    res.status(500).json({
      message: constant.ERROR_API_MESSAGE,
      error: err
    })
  });
})

module.exports = router;
