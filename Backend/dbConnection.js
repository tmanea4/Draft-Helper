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

const averageQuery = `
  SELECT AVG(predicted) AS average_predicted
  FROM (
    SELECT predicted
    FROM players
    ORDER BY predicted DESC
    LIMIT 8
  ) AS highest_predicted;
`;

/* Get Averages */
app.get('/api/average-predicted', (req, res) => {
  connection.query(averageQuery, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      // Handle error
    } else {
      const averagePredicted = results[0].average_predicted;
      console.log('Average of highest 8 predicted values:', averagePredicted);
      res.status(200).json({ average_predicted: averagePredicted });
    }
  });
});

const queryPromise = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

app.get('/api/averages/def/:def/mid/:mid/ruc/:ruc/fwd/:fwd', async (req, res) => {
  const { def, mid, ruc, fwd } = req.params;

  const averages = {
    def: 0,
    fwd: 0,
    mid: 0,
    ruc: 0
  };  

  const query = `
    SELECT AVG(predicted) AS average_predicted
    FROM (
      SELECT predicted
      FROM players
      WHERE position LIKE ? AND ignored != 1
      ORDER BY predicted DESC
      LIMIT ?
    ) AS highest_predicted;
  `;

  const defValues = [`%def%`, parseInt(def)];
  const midValues = [`%mid%`, parseInt(mid)];
  const rucValues = [`%ruc%`, parseInt(ruc)];
  const fwdValues = [`%fwd%`, parseInt(fwd)];

  try {
    const defResults = await queryPromise(query, defValues);
    averages.def = defResults[0].average_predicted;

    const midResults = await queryPromise(query, midValues);
    averages.mid = midResults[0].average_predicted;

    const rucResults = await queryPromise(query, rucValues);
    averages.ruc = rucResults[0].average_predicted;

    const fwdResults = await queryPromise(query, fwdValues);
    averages.fwd = fwdResults[0].average_predicted;

    console.log(averages.def, averages.mid, averages.ruc, averages.fwd);
    
    res.status(200).json(averages);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});


/* Put Predicted */
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

/* Start the server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
