const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'spotinode_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error: ', err);
        throw err;
    }
    console.log('MySQL connected');
});

module.exports = db;
