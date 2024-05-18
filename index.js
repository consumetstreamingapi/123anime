const express = require('express');
const path = require('path');
const { fetchAnilistAnimeDetails, fetchTrendingAnilistAnime, fetchData } = require('./functions'); // Importing functions.js

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

// Static files middleware (for serving CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route for rendering homepage
app.get('/', async (req, res) => {
    try {
        // Fetch trending anime data
        const trendingAnime = await fetchTrendingAnilistAnime();
        // Render the index.ejs template with the trending anime data
        res.render('index2', { trendingAnime });
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/anime/:id', async (req, res) => {
    try {
        const animeId = req.params.id;
        // Now you have the animeId, you can use it to fetch data for that specific anime

        // Fetch anime data based on the animeId
        const animeData = await fetchData(animeId); // Assuming you have a function to fetch anime data

        // Render the index.ejs template with the fetched anime data
        res.render('tv-show-detail', { animeData });
    } catch (error) {
        console.error('Error fetching anime data:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

