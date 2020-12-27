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

/**
 * @api {get} /tourist_package/findByName Find tourism by name
 * @apiName Find tourism by name
 * @apiGroup Tourism
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "search": "tour"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "data": [
 *         {
 *             "tourist_package_id": 1,
 *             "name": "tour 1",
 *             "content": "content",
 *             "image_path": null,
 *             "price": "150000.00",
 *             "start_date": "2020-12-26T17:38:57.000Z",
 *             "end_date": null,
 *             "expired_date": null,
 *             "status": 1,
 *             "min_capacity": null,
 *             "max_capacity": null,
 *             "company_id": 1
 *         }
 *     ]
 * }
 */
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

/**
 * @api {get} /tourist_package/details/:id Get details of tourism
 * @apiName Get details of tourism
 * @apiGroup Tourism
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "data": {
 *         "tourist_package_id": 1,
 *         "name": "tour 1",
 *         "content": "content",
 *         "image_path": null,
 *         "price": "150000.00",
 *         "start_date": "2020-12-26T17:38:57.000Z",
 *         "end_date": null,
 *         "expired_date": null,
 *         "status": 1,
 *         "min_capacity": null,
 *         "max_capacity": null,
 *         "company_id": 1
 *     }
 * }
 */
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
