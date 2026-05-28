 import { Router } from 'express';
import { db } from '../index.mjs';

const router = Router();

router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  const results = await db.all(
    `SELECT e.*, h.name as habitat_name, h.id as habitat_id
     FROM experiences e JOIN habitats h ON e.habitat_id = h.id
     WHERE e.name LIKE ? OR e.description LIKE ?`,
    [`%${q}%`, `%${q}%`]
  );
  res.json(results);
});

router.get('/habitats/:id/experiences', async (req, res) => {
  const experiences = await db.all(
    'SELECT * FROM experiences WHERE habitat_id = ?',
    [req.params.id]
  );
  res.json(experiences);
});

router.get('/events', async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const category = req.query.category || 'all';

  let query = `SELECT * FROM events WHERE strftime('%Y', event_date) = ?`;
  const params = [String(year)];

  if (category !== 'all') {
    query += ` AND category = ?`;
    params.push(category);
  }

  query += ` ORDER BY event_date ASC`;
  const events = await db.all(query, params);
  res.json(events);
});

export default router;
