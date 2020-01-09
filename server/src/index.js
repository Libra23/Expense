const express = require('express')
const app = express()
const mysql = require('mysql');
const DB_NAME = 'RECEIPT_DB';
const MAIN_TABLE_NAME = 'RECEIPT_TABLE';
const CATEGORY_TABLE_NAME = 'CATEGORY_TABEL'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    timezone: 'jst'
});

app.listen(3000, () => {
    console.log('Wake up', 'http://localhost:3000')
    connection.connect((err, result) => {
        if (err) {
            console.log('Fail Connecting database!');
            throw err;
        }
        console.log('Connected to database!');
        console.log(result);
    });
    connection.query('CREATE DATABASE IF NOT EXISTS ??', [DB_NAME], function (err, result) {
        if (err) {
            throw err;
        }
        console.log('Create');
        console.log(result);
    });
    connection.query('USE ??', [DB_NAME], function (err, result) {
        if (err) {
            throw err;
        }
        console.log('Use');
        console.log(result);
    });
    connection.query('CREATE TABLE IF NOT EXISTS ??(\
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, \
        Date DATE NOT NULL, \
        Year INT UNSIGNED, \
        Month INT UNSIGNED, \
        Day INT UNSIGNED, \
        Content VARCHAR(255) NOT NULL, \
        Amount INT UNSIGNED NOT NULL DEFAULT 0, \
        Shop VARCHAR(255), \
        Category INT UNSIGNED NOT NULL DEFAULT 0, \
        Necessity VARCHAR(255), \
        Note VARCHAR(255), \
        Flow VARCHAR(255) NOT NULL)', [MAIN_TABLE_NAME], function (err, result) {
        if (err) {
            throw err;
        }
        console.log('Create table');
        console.log(result);
    });
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// read
app.get('/api/receipts', (req, res) => {
    console.log('Call get & read');
    connection.query('SELECT * FROM ?? WHERE Month = ?', [MAIN_TABLE_NAME, req.body['Month']], function(err, results) {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send(results);
    });
});

//  create
app.post('/api/receipts', (req, res) => {
    console.log('Call post & create');
    connection.query('INSERT INTO ?? SET ?', [MAIN_TABLE_NAME, req.body], function(err, results) {
        if (err) {
            throw err;
        }
        console.log('Call read in create');
        connection.query('SELECT * FROM ??', [MAIN_TABLE_NAME], function(err, results) {
            if (err) {
                throw err;
            }
            console.log(results);
            res.send(results);
        });
    });
});

// update
app.put('/api/receipts/:id', (req, res) => {
    console.log('Call put & update');
    connection.query('UPDATE ?? SET ? WHERE id = ?', [MAIN_TABLE_NAME, req.body, parseInt(req.params.id)], function(err, results) {
        if (err) {
            throw err;
        }
        console.log('Call read in update');
        connection.query('SELECT * FROM ??', [MAIN_TABLE_NAME], function(err, results) {
            if (err) {
                throw err;
            }
            console.log(results);
            res.send(results);
        });
    });
});

// delete
app.delete('/api/receipts/:id', (req, res) => {
    console.log('Call delete & delete');
    connection.query('DELETE FROM ?? WHERE id = ?', [MAIN_TABLE_NAME, parseInt(req.params.id)], function(err, results) {
        if (err) {
            throw err;
        }
        console.log('Call read in delete');
        connection.query('SELECT * FROM ??', [MAIN_TABLE_NAME], function(err, results) {
            if (err) {
                throw err;
            }
            console.log(results);
            res.send(results);
        });
    });
});
