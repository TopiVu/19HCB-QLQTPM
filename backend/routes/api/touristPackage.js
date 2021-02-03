const express = require('express');
const router = express.Router();
const touristPackageModel = require('../../models/tourist_package.model');
const { authenticateToken } = require('../../middlewares/authentication');
const constant = require('../../utils/globals');

/**
 * @api {get} /api/tourist_package Get All Tourism
 * @apiName Index
 * @apiGroup Tourism
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 *     "data":
 *      {
 *          "count": 1,
 *          "firstPage": true,
 *          "lastPage": true,
 *          "prevPage": -1,
 *          "nextPage": -1,
 *          "totalPage": 1,
 *          "records":
 *           [
 *              {
 *                  "tourist_package_id": 1,
 *                  "name": "tour 1",
 *                  "content": "content",
 *                  "image_path": null,
 *                  "price": "150000.00",
 *                  "start_date": "2020-12-26T17:38:57.000Z",
 *                  "end_date": null,
 *                  "expired_date": null,
 *                  "status": 1,
 *                  "min_capacity": null,
 *                  "max_capacity": null,
 *                  "company_id": 1
 *              }
 *           ]
 * }
 */
router.get('/', async function (req, res) {
  try {
    const page = typeof (req.query.page) !== 'undefined' ? parseInt(req.query.page) : 1;
    const data = await touristPackageModel.findAll({ page: page });
    return res.status(200).json({ success: true, data });
  } catch(err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/tourist_package/create Create New Tourism
 * @apiName Create
 * @apiGroup Tourism
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "Phú quốc 3 ngày 2 đêm",
 *    "price": 2000,
 *    "min_capacity": 5,
 *    "max_capacity": 30,
 *    "start_date": "2020-12-15",
 *    "end_date": "2020-12-30",
 *    "expired_date": "2020-12-26",
 *    "content": "Hello World <br> <strong>Strong text here</strong>",
 *    "company_id": 1
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 *     "data": {
 *          "tourist_package_id": 1,
 *          "name": "tour 1",
 *          "content": "content",
 *          "image_path": null,
 *          "price": "150000.00",
 *          "start_date": "2020-12-26T17:38:57.000Z",
 *          "end_date": null,
 *          "expired_date": null,
 *          "status": 1,
 *          "min_capacity": null,
 *          "max_capacity": null,
 *          "company_id": 1
 *     }
 * }
 */
router.post('/create', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await touristPackageModel.create(updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/tourist_package/:id/show Get specific tourism data
 * @apiName Get Detail
 * @apiGroup Tourism
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 *     "data": {
 *          "tourist_package_id": 1,
 *          "name": "tour 1",
 *          "content": "content",
 *          "image_path": null,
 *          "price": "150000.00",
 *          "start_date": "2020-12-26T17:38:57.000Z",
 *          "end_date": null,
 *          "expired_date": null,
 *          "status": 1,
 *          "min_capacity": null,
 *          "max_capacity": null,
 *          "company_id": 1
 *     }
 * }
 */
router.get('/:id/show', async function (req, res) {
  try {
    const data = await touristPackageModel.findById(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/tourist_package/:id/update Update a existing Tourism
 * @apiName Update
 * @apiGroup Tourism
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "Phú quốc 3 ngày 2 đêm",
 *    "price": 2000,
 *    "min_capacity": 5,
 *    "max_capacity": 30,
 *    "start_date": "2020-12-15",
 *    "end_date": "2020-12-30",
 *    "expired_date": "2020-12-26",
 *    "content": "Hello World <br> <strong>Strong text here</strong>",
 *    "company_id": 1
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 *     "data": {
 *          "tourist_package_id": 1,
 *          "name": "tour 1",
 *          "content": "content",
 *          "image_path": null,
 *          "price": "150000.00",
 *          "start_date": "2020-12-26T17:38:57.000Z",
 *          "end_date": null,
 *          "expired_date": null,
 *          "status": 1,
 *          "min_capacity": null,
 *          "max_capacity": null,
 *          "company_id": 1
 *     }
 * }
 */
router.post('/:id/update', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await touristPackageModel.updateById(req.params.id, updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/tourist_package/:id/delete Delete a existing Tourism
 * @apiName Delete
 * @apiGroup Tourism
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */
router.get('/:id/delete', authenticateToken, async function (req, res) {
  try {
    await touristPackageModel.deleteById(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/tourist_package/search Search Tourisms by name
 * @apiName Search
 * @apiGroup Tourism
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
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
 */
router.get('/search', async function (req, res) {
  try {
    const data = await touristPackageModel.findByName(req.query['name']);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.log({err});
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
})

module.exports = router;
