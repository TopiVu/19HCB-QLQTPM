const express = require('express');
const router = express.Router();
const bookingModel = require('../../models/booking.model');
const { authenticateToken } = require('../../middlewares/authentication');
const constant = require('../../utils/globals');

/**
 * @api {get} /api/booking/tourist/:tourist_package_id Get All Booking Where Match Tourist Package Id
 * @apiDescription Status là giá trị integer tương ứng với các trạng thái khi đặt gói: { 1: 'Đang xử lý', 2: 'Thành công', 3: 'Đã hủy bỏ' }
 * @apiName Get Booking Of Tourist
 * @apiGroup Booking
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "count": 1,
 *     "firstPage": true,
 *     "lastPage": true,
 *     "prevPage": -1,
 *     "nextPage": -1,
 *     "totalPage": 1,
 *     "records": [
 *       {
 *         "booking_id": 1,
 *         "status": 1,
 *         "user_id": 10,
 *         "tourist_package_id": 10,
 *         "created_at": "2021-02-03T12:32:59.000Z"
 *       }
 *     ]
 *   }
 * }
 */
router.get('/tourist/:tourist_package_id', async function (req, res) {
  try {
    const page = typeof (req.query.page) !== 'undefined' ? parseInt(req.query.page) : 1;
    const data = await bookingModel.findAllByTourist({ page, tourist_package_id: req.params.tourist_package_id });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/booking/user/:user_id Get All Booking Where Match User Id
 * @apiDescription Status là giá trị integer tương ứng với các trạng thái khi đặt gói: { 1: 'Đang xử lý', 2: 'Thành công', 3: 'Đã hủy bỏ' }
 * @apiName Get Booking Of User
 * @apiGroup Booking
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *   "success": true,
 *   "data": {
 *     "count": 1,
 *     "firstPage": true,
 *     "lastPage": true,
 *     "prevPage": -1,
 *     "nextPage": -1,
 *     "totalPage": 1,
 *     "records": [
 *       {
 *         "booking_id": 1,
 *         "status": 1,
 *         "user_id": 10,
 *         "tourist_package_id": 10,
 *         "created_at": "2021-02-03T12:32:59.000Z"
 *       }
 *     ]
 *   }
 * }
 */
router.get('/user/:user_id', async function (req, res) {
  try {
    const page = typeof (req.query.page) !== 'undefined' ? parseInt(req.query.page) : 1;
    const data = await bookingModel.findAllByUser({ page, user_id: req.params.user_id });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/booking/create Create a booking
 * @apiDescription Status là giá trị integer tương ứng với các trạng thái khi đặt gói: { 1: 'Đang xử lý', 2: 'Thành công', 3: 'Đã hủy bỏ' }
 * @apiName Create
 * @apiGroup Booking
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "tourist_package_id": 1
 *    "user_id": 4
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "tourist_package_id": 1
 *         "user_id": 4
 *     }
 * }
 */
router.post('/create', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await bookingModel.create(updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/booking/:id/show Get Booking Detail
 * @apiDescription Status là giá trị integer tương ứng với các trạng thái khi đặt gói: { 1: 'Đang xử lý', 2: 'Thành công', 3: 'Đã hủy bỏ' }
 * @apiName Get detail
 * @apiGroup Booking
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "booking_id": 2,
 *         "status": 1,
 *         "user_id": 11,
 *         "tourist_package_id": 11,
 *         "created_at": "2021-02-03T12:32:59.000Z"
 *     }
 * }
 */
router.get('/:id/show', async function (req, res) {
  try {
    const data = await bookingModel.findById(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/booking/:id/update Update a booking
 * @apiDescription Status là giá trị integer tương ứng với các trạng thái khi đặt gói: { 1: 'Đang xử lý', 2: 'Thành công', 3: 'Đã hủy bỏ' }
 * @apiName Update
 * @apiGroup Booking
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "status": 3
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  "success": true,
 *  "data": {
 *      "status": 3
 *  }
 * }
 */
router.post('/:id/update', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await bookingModel.updateById(req.params.id, updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});
module.exports = router;