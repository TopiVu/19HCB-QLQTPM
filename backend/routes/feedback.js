var express = require('express');
var router = express.Router();
var validation = require('../middlewares/validate.mdw');
var feedbackModel = require('../models/feedback.model');
var constant = require('../utils/globals');

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
