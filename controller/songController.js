const songModel = require('../models/songModel');

exports.getSongs = (req, res) => {
    songModel.getSongs((err, results) => {
        if (err) {
            console.error('Error fetching songs: ', err);
            return res.status(500).send('Error fetching songs');
        }
        
        res.render('index', { 
            title: 'Audio Player Example', 
            tracks: results  
        });
    });
};

exports.showUploadForm = (req, res) => {
    res.render('upload');  
};

exports.addSong = (req, res) => {
    const songData = {
        title: req.body.title,
        artist: req.body.artist,
        image_path: req.files['image_cover'][0].path,  
        file_path: req.files['songFile'][0].path  
    };

    songModel.addSong(songData, (err, result) => {
        if (err) {
            console.error('Error adding song: ', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/');  
    });
};

exports.getSongById = (req, res) => {
    const songId = req.params.id;

    songModel.getSongById(songId, (err, result) => {
        if (err) {
            console.error('Error fetching song by ID: ', err);
            return res.status(500).send('Error fetching song by ID');
        }
        res.render('editForm', { songs: result[0] });  
    });
};

exports.updateSong = (req, res) => {
    const songId = req.params.id;
    const { title, artist } = req.body; 

    let songFilePath = null;
    if (req.file) {
        songFilePath = req.file.path; 
    }

    const query = 'UPDATE songs SET title = ?, artist = ?' + (songFilePath ? ', file_path = ?' : '') + ' WHERE id = ?';
    const values = songFilePath ? [title, artist, songFilePath, songId] : [title, artist, songId];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating song:', error);
            return res.status(500).send('Error updating song');
        }
        res.redirect('/'); 
    });
};

exports.deleteSong = (req, res) => {
    const songId = req.params.id;

    songModel.deleteSong(songId, (err, result) => {
        if (err) {
            console.error('Error deleting song: ', err);
            return res.status(500).send('Error deleting song');
        }
        res.status(200).send('Song deleted successfully'); 
    });
};
