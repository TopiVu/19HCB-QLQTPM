const express = require('express');
const router = express.Router();
const knex = require('./../config/db');
const { parseStrToDate, parseDateToStr } = require('./../config/utils');

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


module.exports = router;
