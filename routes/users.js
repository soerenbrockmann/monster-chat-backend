import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('get list of usres');
});

router.get('/friends', (req, res, next) => {
  res.send('get list of frinds');
});

export default router;
