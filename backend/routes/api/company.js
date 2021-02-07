const express = require('express');
const router = express.Router();
const companyModel = require('../../models/company.model');
const { authenticateToken } = require('../../middlewares/authentication');
const constant = require('../../utils/globals');

/**
 * @api {get} /api/company Get All Company
 * @apiName Index
 * @apiGroup Company
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 *     "data":
 *      {
 *          "count": 2,
 *          "firstPage": true,
 *          "lastPage": true,
 *          "prevPage": -1,
 *          "nextPage": -1,
 *          "totalPage": 1,
 *          "records":
 *           [
 *            {
 *                "company_id": 1,
 *                "name": "Highland",
 *                "address": "272 Nguyen Van Cu",
 *                "phone": "0123456789",
 *                "user_id": 1
 *            },
 *            {
 *                "company_id": 5,
 *                "name": "The coffee house",
 *                "address": "272 nguyen van cu",
 *                "phone": "012345001",
 *                "user_id": 5
 *            },
 *           ]
 *     ]
 * }
 */
router.get('/', async function (req, res) {
  try {
    const page = typeof (req.query.page) !== 'undefined' ? parseInt(req.query.page) : 1;
    const data = await companyModel.findAll({ page });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/company/create Create New Company
 * @apiName Create
 * @apiGroup Company
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "Circle K",
 *    "address": "300 pham ngu lao",
 *    "phone": "0345123789",
 *    "user_id": 4
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "name": "Circle K",
 *         "address": "300 pham ngu lao",
 *         "phone": "0345123789",
 *         "user_id": 4
 *     }
 * }
 */
router.post('/create', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await companyModel.create(updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/company/:id/show Get specific Company data
 * @apiName Get Detail
 * @apiGroup Company
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "name": "Circle K",
 *         "address": "300 pham ngu lao",
 *         "phone": "0345123789",
 *         "user_id": 4
 *     }
 * }
 */
router.get('/:id/show', async function (req, res) {
  try {
    const data = await companyModel.findById(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/company/:id/update Update a existing Company
 * @apiName Update
 * @apiGroup Company
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "data": {
 *         "name": "Phuc long",
 *         "address": "688 Cach Mang Thang 8",
 *         "phone": "022233344",
 *         "user_id": 4
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "name": "Phuc long",
 *         "address": "688 Cach Mang Thang 8",
 *         "phone": "022233344",
 *         "user_id": 4
 *     }
 * }
 */
router.post('/:id/update', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await companyModel.updateById(req.params.id, updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/company/:id/delete Delete a existing Company
 * @apiName Delete
 * @apiGroup Company
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
    await companyModel.deleteById(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/company/search?name=abc&address=xyz&phone=123 Search Companies by name, address, phone
 * @apiName Search
 * @apiGroup Company
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 *     "data": [
 *         {
 *             "company_id": 1,
 *             "name": "Highland",
 *             "address": "272 Nguyen Van Cu",
 *             "phone": "0123456789",
 *             "user_id": 1
 *         },
 *     ]
 */
router.get('/search', async function (req, res) {
  try {
    const name = req.query['name'] || '';
    const address = req.query['address'] || '';
    const phone = req.query['phone'] || '';

    const data = await companyModel.search({ name, address, phone });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
})

module.exports = router;
