const express = require('express');
const router = express.Router();
const feedbackModel = require('../../models/feedback.model');
const { authenticateToken } = require('../../middlewares/authentication');
const constant = require('../../utils/globals');

/**
 * @api {get} /api/feedback/tourist/:tourist_package_id Get All Feedback Where Match Tourist Package Id
 * @apiName Get Feedback Of Tourist
 * @apiGroup Feedback
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
 *         "feedback_id": 1,
 *         "feedback": "This place so great !!!!",
 *         "rate": 5,
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
    const data = await feedbackModel.findAllByTourist({ page, tourist_package_id: req.params.tourist_package_id });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/feedback/user/:user_id Get All Feedback Where Match user Package Id
 * @apiName Get Feedback Of user
 * @apiGroup Feedback
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
 *         "feedback_id": 1,
 *         "feedback": "This place so great !!!!",
 *         "rate": 5,
 *         "user_id": 10,
 *         "user_id": 10,
 *         "created_at": "2021-02-03T12:32:59.000Z"
 *       }
 *     ]
 *   }
 * }
 */
router.get('/user/:user_id', async function (req, res) {
  try {
    const page = typeof (req.query.page) !== 'undefined' ? parseInt(req.query.page) : 1;
    const data = await feedbackModel.findAllByUser({ page, user_id: req.params.user_id });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/feedback/create Create a Feedback
 * @apiName Create
 * @apiGroup Feedback
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "tourist_package_id": 1,
 *    "user_id": 4,
 *    "feedback": "Huong dan vien chuyen nghiep, chuong trinh phong phu",
 *    "rate": 5
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "tourist_package_id": 1,
 *         "user_id": 4,
 *         "feedback": "Huong dan vien chuyen nghiep, chuong trinh phong phu",
 *         "rate": 5
 *     }
 * }
 */
router.post('/create', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await feedbackModel.create(updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/feedback/:id/show Get Feedback Detail
 * @apiName Get detail
 * @apiGroup Feedback
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "tourist_package_id": 1,
 *         "user_id": 4,
 *         "feedback": "Huong dan vien chuyen nghiep, chuong trinh phong phu",
 *         "rate": 5
 *     }
 * }
 */
router.get('/:id/show', async function (req, res) {
  try {
    const data = await feedbackModel.findById(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {post} /api/feedback/:id/update Update a Feedback
 * @apiName Update
 * @apiGroup Feedback
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "feedback": "Tam duoc",
 *    "rate": 3
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  "success": true,
 *  "data": {
 *    "feedback": "Tam duoc",
 *    "rate": 3
 *  }
 * }
 */
router.post('/:id/update', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await feedbackModel.updateById(req.params.id, updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

/**
 * @api {get} /api/feedback/:id/delete Delete a Feedback
 * @apiName Delete
 * @apiGroup Feedback
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer eyJhbGci....xyyz"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  "success": true
 * }
 */
router.get('/:id/delete', authenticateToken, async function (req, res) {
  try {
    await feedbackModel.deleteById(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});
module.exports = router;