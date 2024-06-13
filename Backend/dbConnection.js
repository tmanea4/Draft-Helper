// server.js
import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3001;

// Configure CORS to allow requests from specific origin
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

// Create a connection to the database
const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define an API endpoint to fetch data
app.get('/api/rows', (req, res) => {
  connection.query('SELECT * FROM players', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.put('/api/rows/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  console.log('Request Body:', updates);

  // Check if there's at least one key-value pair in the request body
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'Update data is required' });
  }

  // Validate the column name to prevent SQL injection
  const validColumns = ['predicted', 'ignored']; // Add any other valid columns here
  const column = Object.keys(updates)[0]; // Assuming only one key-value pair is sent
  const value = updates[column];

  if (!validColumns.includes(column)) {
    return res.status(400).json({ error: 'Invalid column name' });
  }
  
  // Construct the query dynamically
  const query = `UPDATE players SET ${column} = ? WHERE id = ?`;
  connection.query(query, [value, id], (err, results) => {
    if (err) {
      console.error('Error updating data:', err); // Log the error
      res.status(500).send(err);
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Player not found' });
    } else {
      res.json({ success: true });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
