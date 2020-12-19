var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { page: 'components/touristPackage/index' });
});

router.get('/new', function(req, res, next) {
  res.render('index', { page: 'components/touristPackage/new' });
});

router.get('/:id/show', function(req, res, next) {
  res.render('index', { page: 'components/touristPackage/show' });
});

module.exports = router;
