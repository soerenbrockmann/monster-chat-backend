import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('get list of usres');
});

router.post('/', (req, res, next) => {
  res.send('get list of usres');
});

router.delete('/:userid', (req, res, next) => {
  res.send('get list of usres');
});

export default router;
