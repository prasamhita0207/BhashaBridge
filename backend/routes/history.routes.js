const router = require('express').Router();
const Translation = require('../models/Translation');
router.get('/history', async (req, res, next) => {
  try {
    const clientId = req.headers['x-client-id'];
    if (!clientId) return res.json([]);
    res.json(await Translation.find({ clientId }).sort({ createdAt: -1 }).limit(200));
  } catch (err) { next(err); }
});
router.delete('/history', async (req, res, next) => {
  try {
    const clientId = req.headers['x-client-id'];
    if (clientId) await Translation.deleteMany({ clientId });
    res.status(204).end();
  } catch (err) { next(err); }
});
router.delete('/history/:id', async (req, res, next) => {
  try {
    const clientId = req.headers['x-client-id'];
    if (clientId) await Translation.deleteOne({ _id: req.params.id, clientId });
    res.status(204).end();
  } catch (err) { next(err); }
});
module.exports = router;
