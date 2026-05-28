 import { Router } from 'express';
import { db } from '../index.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/habitats', async (req, res) => {
  const habitats = await db.all('SELECT * FROM habitats');
  res.render('habitats', { habitats });
});

router.get('/habitats/:id', async (req, res) => {
  const habitat = await db.get('SELECT * FROM habitats WHERE id = ?', [req.params.id]);
  const experiences = await db.all('SELECT * FROM experiences WHERE habitat_id = ?', [req.params.id]);
  res.render('habitat-detail', { habitat, experiences });
});


router.get('/faq', (req, res) => {
  res.render('faq');
});

router.get('/contact', (req, res) => {
  const success = req.query.success === 'true';
  res.render('contact', { success });
});

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  await db.run(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message]
  );
  res.redirect('/contact?success=true');
});

router.get('/activity', (req, res) => {
  res.render('activity');
});

router.get('/events', (req, res) => {
  res.render('events');
});

router.get('/events/:id', async (req, res) => {
  const event = await db.get('SELECT * FROM events WHERE id = ?', [req.params.id]);
  const today = new Date().toISOString().split('T')[0];
  const isPast = event.event_date < today;
  res.render('event-detail', { event, isPast });
});

export default router;
