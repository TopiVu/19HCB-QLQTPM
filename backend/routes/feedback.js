var express = require('express');
var router = express.Router();
var validation = require('../middlewares/validate.mdw');
var feedbackModel = require('../models/feedback.model');
var constant = require('../utils/globals');

/**
 * @api {get} /feedback/:tourist_package_id Get feedback of tourism
 * @apiName Get feedback of tourism
 * @apiGroup Tourism
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "data": [
 *         {
 *             "feedback_id": 1,
 *             "feedback": "Good",
 *             "rate": 5,
 *             "user_id": 1,
 *             "tourist_package_id": 1
 *         }
 *     ]
 * }
 */
router.get('/:tourist_package_id', validation(require('../schemas/searchCommon.json')), function (req, res, next) {
  var tourist_package_id = req.params.tourist_package_id;
  
  feedbackModel.findByTouristPackageId(tourist_package_id).then(feedbacks => {
    res.json({
      data: feedbacks
    });
  }).catch(err => {
    res.status(500).json({
      message: constant.ERROR_API_MESSAGE,
      error: err
    })
  })
});

module.exports = router;
