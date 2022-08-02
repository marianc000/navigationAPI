import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import apiRouter from './routes/api.js';

const app = express();

app.use(bodyParser.json());

const baseDir = dirname(fileURLToPath(import.meta.url));

app.get(['/defaultScroll/','/restoreScroll/'], (req, res, next) => {
  req.url+='index.html';
  next();
});

app.get('*/edit/*', (req, res, next) => {
  console.log("edit",req.url);
  req.url = req.originalUrl = req.url.replace(/\/edit\/.*$/,'/');
  next();
});

app.use('/', express.static(join(baseDir, 'static'), { redirect: false }));

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})