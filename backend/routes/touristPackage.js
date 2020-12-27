var express = require('express');
var router = express.Router();
var knex = require('./../config/db');
var { parseStrToDate, parseDateToStr } = require('./../utils/dateHelper');
var validation = require('../middlewares/validate.mdw');
var touristPackageModel = require('../models/tourist_package.model');
var constant = require('../utils/globals');

router.get('/', function (req, res, next) {
  res.render('index', { page: 'components/touristPackage/index' });
});

router.get('/new', function (req, res, next) {
  res.render('index', { page: 'components/touristPackage/new', packageData: null });
});

router.post('/create', async function (req, res, next) {
  const { name, price, min_capacity, max_capacity, start_date, end_date, expired_date, content } = req.body;
  const data = {
    name,
    price,
    min_capacity,
    max_capacity,
    start_date: parseStrToDate(start_date),
    end_date: parseStrToDate(end_date),
    expired_date: parseStrToDate(expired_date),
    content,
    company_id: 1
  }

  try {
    const touristPackage = await knex('tourist_package').insert(data);
    return res.redirect('/tourist_package');
  } catch (err) {
    const packageData = {
      ...data,
      start_date: parseDateToStr(data.start_date),
      expired_date: parseDateToStr(data.expired_date),
      end_date: parseDateToStr(data.end_date),
    }
    return res.render('index', { page: 'components/touristPackage/new', packageData });
  }
});

router.get('/:id/show', async function (req, res, next) {
  const packageId = req.params.id;
  const packageDataRow = await knex('tourist_package').select().where({ tourist_package_id: packageId });
  const packageData = {
    ...packageDataRow[0],
    price: parseInt(packageDataRow[0].price),
    start_date: parseDateToStr(packageDataRow[0].start_date),
    expired_date: parseDateToStr(packageDataRow[0].expired_date),
    end_date: parseDateToStr(packageDataRow[0].end_date),
  }
  res.render('index', { page: 'components/touristPackage/show', packageId, packageData });
});

router.post('/:id/update', async function (req, res, next) {
  const packageId = req.params.id;
  const { name, price, min_capacity, max_capacity, start_date, end_date, expired_date, content } = req.body;

  const data = {
    name,
    price,
    min_capacity,
    max_capacity,
    start_date: parseStrToDate(start_date),
    end_date: parseStrToDate(end_date),
    expired_date: parseStrToDate(expired_date),
    content,
    company_id: 1
  }

  try {
    const touristPackage = await knex('tourist_package').update(data).where({ tourist_package_id: packageId })
    return res.redirect('/tourist_package');
  } catch (err) {
    const packageData = {
      ...data,
      start_date: parseDateToStr(data.start_date),
      expired_date: parseDateToStr(data.expired_date),
      end_date: parseDateToStr(data.end_date),
    }
    return res.render('index', { page: 'components/touristPackage/show', packageId, packageData });
  }
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
