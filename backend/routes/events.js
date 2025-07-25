import express from 'express';
import { getAll, get, add, replace, remove } from '../data/event.js';
import { checkAuth } from '../util/auth.js';
import {
  isValidText,
  isValidDate,
  isValidImageUrl,
} from '../util/validation.js';

const router = express.Router();

// GET: Public - Fetch all events
router.get('/', async (req, res, next) => {
  try {
    const events = await getAll();
    res.json({ events });
  } catch (error) {
    next(error);
  }
});

// GET: Public - Fetch single event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.json({ event });
  } catch (error) {
    next(error);
  }
});

// Protect routes after this point
router.use(checkAuth);

// POST: Authenticated - Add new event
router.post('/', async (req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Authenticated user:', req.token);

  const data = req.body;
  console.log('Request body:', data);

  const errors = {};

  if (!isValidText(data.title)) errors.title = 'Invalid title.';
  if (!isValidText(data.description)) errors.description = 'Invalid description.';
  if (!isValidDate(data.date)) errors.date = 'Invalid date.';
  if (!isValidImageUrl(data.image)) errors.image = 'Invalid image.';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the event failed due to validation errors.',
      errors,
    });
  }

  try {
    const newEvent = await add(data); // Capture the added event
    console.log('Event successfully added');
    res.status(201).json({ message: 'Event saved.', event: newEvent });
  } catch (error) {
    console.error('Full error:', error);
    next(error);
  }
});

// PATCH: Authenticated - Update event
router.patch('/:id', async (req, res, next) => {
  const data = req.body;
  const errors = {};

  if (!isValidText(data.title)) errors.title = 'Invalid title.';
  if (!isValidText(data.description)) errors.description = 'Invalid description.';
  if (!isValidDate(data.date)) errors.date = 'Invalid date.';
  if (!isValidImageUrl(data.image)) errors.image = 'Invalid image.';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the event failed due to validation errors.',
      errors,
    });
  }

  try {
    const updatedEvent = await replace(req.params.id, data);
    res.json({ message: 'Event updated.', event: updatedEvent });
  } catch (error) {
    next(error);
  }
});

// DELETE: Authenticated - Remove event
router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Event deleted.' });
  } catch (error) {
    next(error);
  }
});

export default router;
