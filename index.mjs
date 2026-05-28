import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export const db = await open({
  filename: path.join(__dirname, 'db', 'wildroots.db'),
  driver: sqlite3.Database
});

console.log('Database connected successfully');

import pagesRouter from './routes/pages.mjs';
import apiRouter from './routes/api.mjs';

app.use('/', pagesRouter);
app.use('/api', apiRouter);

app.listen(5000, () => {
  console.log('WildRoots running on http://localhost:5000');
});