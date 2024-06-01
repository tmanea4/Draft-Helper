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

// Create a connection to the database
const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'aflstats'
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

  console.log(req.body);

  const { average } = req.body;

  if (average === undefined) {
    return res.status(400).json({ error: 'Average is required' });
  }

  if (!id || !average) {
    return res.status(400).json({ error: 'ID and average are required' });
  }

  const query = 'UPDATE players SET average = ? WHERE id = ?';
  connection.query(query, [average, id], (err, results) => {
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
