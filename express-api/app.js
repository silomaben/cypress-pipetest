const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'db-instance.cjr4qbxdh5o6.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'gitpass2016',
    database: 'students'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});



const app = express();

// Use the cors middleware
app.use(cors());

// Define a route to fetch student data
app.get('/students', (req, res) => {
    // Query to fetch student data
    const query = 'SELECT * FROM students';

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching student data: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
