const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const songRoutes = require('./routes/songRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  


app.post('/index/:id', (req, res) => {
    const songId = req.params.id;
    const title = req.body.title;
    const artist = req.body.artist;

    if (typeof title !== 'string' || typeof artist !== 'string' || !songId) {
        return res.status(400).send('Invalid input data');
    }

    console.log('Updating song with ID:', songId, 'Title:', title, 'Artist:', artist);

    const sql = 'UPDATE songs SET title = ?, artist = ? WHERE id = ?';
    db.query(sql, [title, artist, songId], (err, results) => {
        if (err) {
            console.error('Error updating song:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({ message: 'Song updated successfully!' });
    });
});

app.use('/', songRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
