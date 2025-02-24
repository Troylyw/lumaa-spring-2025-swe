import express, { Request, Response } from 'express';
import pool from '../db';
import { authenticateToken, AuthRequest } from '../middleware/app';

const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    res.json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const { userId } = req.user;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description || '', false, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  const { userId } = req.user;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description || '', isComplete, id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;









