import sourceData from '../data/data.json' assert { type: "json" };
import { Router } from 'express';

const data = {};
sourceData.forEach(o => data[o.tag] = o);

const router = Router();

router.get('/', (req, res) => {
  res.send(Object.values(data));
});

router.get('/:tag', (req, res) => {
  res.send(data[req.params.tag]);
});

router.post('/', (req, res) => {
  data[req.body.tag] = req.body;
  res.send();
});

export default router;