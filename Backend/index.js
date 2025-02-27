import pg from 'pg';
import express from 'express';
import cors from 'cors';

// import bodyParser from 'body-parser';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

client.connect();

const app = express();

// Configure CORS to allow requests from specific origin
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define an API endpoint to fetch data
app.get('/api/rows/:table', (req, res) => {

  const { table } = req.params;
  console.log('Table:', table);
  console.log('Request:', req.params);
  // const query = `SELECT * FROM players`;

  const query = `SELECT 
  p.id, 
  p.name,
  p.age,
  p.average, 
  COALESCE(u.predicted, p.average) AS predicted, 
  p.price,
  p.position,
  COALESCE(u.drafted, p.drafted) AS drafted, 
  COALESCE(u.ignored, p.ignored) AS ignored
FROM players p
LEFT JOIN tmanea4 u ON p.id = u.id;`;

  client.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results.rows);
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
  client.query(averageQuery, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      // Handle error
    } else {
      const averagePredicted = results.rows[0].average_predicted;
      console.log('Average of highest 8 predicted values:', averagePredicted);
      res.status(200).json({ average_predicted: averagePredicted });
    }
  });
});

const queryPromise = (query, values) => {
  return new Promise((resolve, reject) => {
    client.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.rows);
    });
  });
};

const tableTest = `
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = $1 AND table_schema = 'public'
  ) AS table_exists;
`;

app.get('/api/testtable/:table', async (req, res) => {
  try {
    const table = req.params.table;
    const sanitizedTable = table.replace(/[^a-zA-Z0-9_]/g, '');
    const result = await queryPromise(tableTest, [sanitizedTable]);
    res.status(200).json(result[0].table_exists); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/createtable/:table', async (req, res) => {
  try {
    const table = req.params.table;
    const sanitizedTable = table.replace(/[^a-zA-Z0-9_]/g, '');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${sanitizedTable} (
        id SERIAL PRIMARY KEY,
        predicted FLOAT,
        drafted INT DEFAULT 0,
        ignored INT DEFAULT 0
      );
    `;

    const result = await queryPromise(createTableQuery);
    res.status(200).json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/rows/:id/:table', async (req, res) => {
  const { id, table } = req.params;
  const updates = req.body;

  console.log('Request Body:', updates, 'ID:', id, 'Table:', table);

  // Check if there's at least one key-value pair in the request body
  if (Object.keys(updates).length === 0) { 
    return res.status(400).json({ error: 'Update data is required' });
  }

  // Validate and filter columns
  const validColumns = ['predicted', 'drafted', 'ignored']; // List of allowed columns
  const columns = Object.keys(updates).filter(col => validColumns.includes(col));

  if (columns.length === 0) {
    return res.status(400).json({ error: 'Invalid column names' });
  }

  // Generate column names, placeholders, and update expressions
  const columnNames = columns.join(', ');
  const placeholders = columns.map((_, i) => `$${i + 2}`).join(', ');
  const updatesList = columns.map(col => `${col} = EXCLUDED.${col}`).join(', ');

  // Construct the query dynamically
  const query = `
    INSERT INTO ${table} (id, ${columnNames})
    VALUES ($1, ${placeholders})
    ON CONFLICT (id)
    DO UPDATE SET ${updatesList};
  `;

  console.log(query)

  // Extract values, ensuring ID is first
  const values = [id, ...columns.map(col => updates[col])];

  console.log('Query:', query, 'Values:', values);

  try {
    const result = await client.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/team-structure/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Check if user exists
    const checkQuery = `SELECT * FROM teamstructures WHERE username = $1;`;
    const checkResult = await client.query(checkQuery, [username]);

    if (checkResult.rows.length === 0) {
      // Insert new user if not found
      const insertQuery = `INSERT INTO teamstructures (username) VALUES ($1) RETURNING *;`;
      const insertResult = await client.query(insertQuery, [username]);
      return res.json(insertResult.rows[0]); // Return the new user
    }
    res.json(checkResult.rows[0]); // Return existing user
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/team-structure/:username', async (req, res) => {
  const { username } = req.params;
  const { players, forwards, midfielders, defenders, rucks } = req.body;

  try {
    const query = `
      UPDATE teamstructures 
      SET players = $1, forwards = $2, midfielders = $3, defenders = $4, rucks = $5
      WHERE username = $6
      RETURNING *;
    `;
    
    const values = [players, forwards, midfielders, defenders, rucks, username];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]); // Return the updated row
  } catch (error) {
    console.error('Error updating team structure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3000, () => console.log(`App running on port 3000.`));
