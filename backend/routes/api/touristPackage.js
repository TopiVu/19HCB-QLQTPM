const express = require('express');
const router = express.Router();
const touristPackageModel = require('../../models/tourist_package.model');
const { authenticateToken } = require('../../middlewares/authentication');
const constant = require('../../utils/globals');

router.get('/', async function (req, res) {
  return res.status(200).json({ success: true, data: ['Array', 'array002'] });
});

router.post('/create', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await touristPackageModel.create(updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

router.get('/:id/show', async function (req, res) {
  try {
    const data = await touristPackageModel.findById(req.params.id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

router.post('/:id/update', authenticateToken, async function (req, res) {
  try {
    const updateData = req.body;
    await touristPackageModel.updateById(req.params.id, updateData);

    return res.status(200).json({ success: true, data: updateData });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

router.get('/:id/delete', authenticateToken, async function (req, res) {
  try {
    await touristPackageModel.deleteById(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: constant.ERROR_API_MESSAGE, error: err })
  }
});

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
