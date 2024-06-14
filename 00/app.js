import express from 'express';
import ROUTES from './task01/routes.js';

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

for (const {path, handler} of ROUTES.get) 
  app.get(path, handler);

for (const {path, handler} of ROUTES.post) 
  app.post(path, handler);

app.listen(3000);
