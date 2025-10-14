import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize SQLite database
const db = new sqlite3.Database(join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err)
  } else {
    console.log('Connected to SQLite database')
  }
})

// Helper function to run SQL queries with promises
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err)
      else resolve(this)
    })
  })
}

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

// Get all habits
app.get('/api/habits', async (req, res) => {
  try {
    const habits = await dbAll('SELECT * FROM habits')
    res.json(habits)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add new habit
app.post('/api/habits', async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }

  try {
    const result = await dbRun('INSERT INTO habits (name, active) VALUES (?, 1)', [name])
    const newHabit = await dbAll('SELECT * FROM habits WHERE id = ?', [result.lastID])

    // Add to today's progress
    const today = new Date().toISOString().split('T')[0]
    await dbRun('INSERT INTO habit_progress (habit_id, date, completed) VALUES (?, ?, 0)', [
      result.lastID,
      today,
    ])

    res.json(newHabit[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update habit status (active/inactive)
app.patch('/api/habits/:id/status', async (req, res) => {
  const { id } = req.params
  const { active } = req.body

  try {
    const today = new Date().toISOString().split('T')[0]

    if (active) {
      // When resuming a habit
      await dbRun('UPDATE habits SET active = 1 WHERE id = ?', [id])

      // Update the most recent pause period with resume date
      await dbRun(
        'UPDATE pause_periods SET resumed_at = ? WHERE habit_id = ? AND resumed_at IS NULL',
        [today, id],
      )

      // Add progress entry for today
      await dbRun(
        'INSERT OR IGNORE INTO habit_progress (habit_id, date, completed) VALUES (?, ?, 0)',
        [id, today],
      )
    } else {
      // When pausing a habit
      await dbRun('UPDATE habits SET active = 0 WHERE id = ?', [id])

      // Create a new pause period
      await dbRun('INSERT INTO pause_periods (habit_id, paused_at) VALUES (?, ?)', [id, today])

      // Remove progress entry for today
      await dbRun('DELETE FROM habit_progress WHERE habit_id = ? AND date = ?', [id, today])
    }

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete habit
app.delete('/api/habits/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Delete all progress records for this habit
    await dbRun('DELETE FROM habit_progress WHERE habit_id = ?', [id])
    // Delete all pause periods for this habit
    await dbRun('DELETE FROM pause_periods WHERE habit_id = ?', [id])
    // Then delete the habit itself
    await dbRun('DELETE FROM habits WHERE id = ?', [id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get progress for a specific date
app.get('/api/progress/:date', async (req, res) => {
  const { date } = req.params

  try {
    const progress = await dbAll(
      `
      SELECT 
        h.id, 
        h.name, 
        h.active,
        p.completed,
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM pause_periods pp
            WHERE pp.habit_id = h.id
            AND date(pp.paused_at) <= date(?)
            AND (pp.resumed_at IS NULL OR date(pp.resumed_at) > date(?))
          ) THEN 0
          ELSE 1
        END as was_active_on_date
      FROM habits h
      LEFT JOIN habit_progress p ON h.id = p.habit_id AND p.date = ?
      WHERE date(h.created_at) <= date(?)
    `,
      [date, date, date, date],
    )
    res.json(progress)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update progress for a habit on a specific date
app.post('/api/progress', async (req, res) => {
  const { habitId, date, completed } = req.body

  try {
    await dbRun(
      `
      INSERT OR REPLACE INTO habit_progress (habit_id, date, completed)
      VALUES (?, ?, ?)
    `,
      [habitId, date, completed],
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create progress for a specific date
app.post('/api/progress/:date', async (req, res) => {
  const { date } = req.params

  try {
    // Get all active habits that were created on or before this date
    const activeHabits = await dbAll(
      'SELECT id, name FROM habits WHERE active = 1 AND date(created_at) <= date(?)',
      [date],
    )

    // Insert progress for each active habit
    for (const habit of activeHabits) {
      await dbRun(
        `
        INSERT OR IGNORE INTO habit_progress (habit_id, date, completed)
        VALUES (?, ?, 0)
      `,
        [habit.id, date],
      )
    }

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update habit creation date
app.patch('/api/habits/:id/creation-date', async (req, res) => {
  const { id } = req.params
  const { created_at } = req.body

  if (!created_at) {
    return res.status(400).json({ error: 'Creation date is required' })
  }

  try {
    // First, delete any progress entries before the new creation date
    await dbRun('DELETE FROM habit_progress WHERE habit_id = ? AND date < date(?)', [
      id,
      created_at,
    ])

    // Update the creation date
    await dbRun('UPDATE habits SET created_at = ? WHERE id = ?', [created_at, id])

    // Create progress entry for the creation date if it's today or in the past
    const today = new Date().toISOString().split('T')[0]
    if (created_at <= today) {
      await dbRun(
        'INSERT OR IGNORE INTO habit_progress (habit_id, date, completed) VALUES (?, ?, 0)',
        [id, created_at],
      )
    }

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get pause history for a habit
app.get('/api/habits/:id/pause-history', async (req, res) => {
  const { id } = req.params

  try {
    const pauseHistory = await dbAll(
      `
      SELECT 
        id,
        date(paused_at) as paused_at,
        date(resumed_at) as resumed_at
      FROM pause_periods
      WHERE habit_id = ?
      ORDER BY paused_at DESC
    `,
      [id],
    )
    res.json(pauseHistory)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update habit name
app.patch('/api/habits/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }

  try {
    await dbRun('UPDATE habits SET name = ? WHERE id = ?', [name, id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
