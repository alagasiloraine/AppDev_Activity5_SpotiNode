const db = require('../config/db');

// Function to get all songs
exports.getSongs = (callback) => {
    const query = 'SELECT * FROM songs';  // Make sure the table name matches your database
    db.query(query, callback);
};

// Function to add a new song
exports.addSong = (songData, callback) => {
    const query = 'INSERT INTO songs SET ?';  // Insert song data into the database
    db.query(query, songData, callback);
};

// Function to get a song by ID
exports.getSongById = (songId, callback) => {
    const query = 'SELECT * FROM songs WHERE id = ?';
    db.query(query, [songId], callback);
};

// Function to update a song by ID
exports.updateSong = (songId, updatedSongData, callback) => {
    const query = 'UPDATE songs SET ? WHERE id = ?';
    db.query(query, [updatedSongData, songId], callback);
};

// Function to delete a song by ID
exports.deleteSong = (songId, callback) => {
    const query = 'DELETE FROM songs WHERE id = ?';
    db.query(query, [songId], callback);
};
