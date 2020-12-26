const express = require('express');
const router = express.Router();
const knex = require('./../../config/db');
const { parseStrToDate, parseDateToStr } = require('./../../config/utils');

router.get('/:id/show', async function (req, res, next) {
  const packageId = req.params.id;
  try {
    const packageDataRow = await knex('tourist_package').select().where({ tourist_package_id: packageId });

    if (!packageDataRow || packageDataRow.length <= 0) return res.json({ success: false, msg: 'data not found' });

    const packageData = {
      ...packageDataRow[0],
      price: parseInt(packageDataRow[0].price),
      start_date: parseDateToStr(packageDataRow[0].start_date),
      expired_date: parseDateToStr(packageDataRow[0].expired_date),
      end_date: parseDateToStr(packageDataRow[0].end_date),
    }

    return res.json({ success: true, data: packageData, msg: 'data fetched successfully' });
  } catch (err) {
    return res.json({ success: false, msg: 'something went wrong'});
  }
});

module.exports = router;
