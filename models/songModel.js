const db = require('../config/db');

exports.getSongs = (callback) => {
    const query = 'SELECT * FROM songs';
    db.query(query, callback);
};

exports.addSong = (songData, callback) => {
    const query = 'INSERT INTO songs SET ?';
    db.query(query, songData, callback);
};

exports.getSongById = (songId, callback) => {
    const query = 'SELECT * FROM songs WHERE id = ?';
    db.query(query, [songId], callback);
};

exports.updateSong = (songId, updatedSongData, callback) => {
    const query = 'UPDATE songs SET ? WHERE id = ?';
    db.query(query, [updatedSongData, songId], callback);
};

exports.deleteSong = (songId, callback) => {
    const query = 'DELETE FROM songs WHERE id = ?';
    db.query(query, [songId], callback);
};
