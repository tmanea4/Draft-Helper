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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
