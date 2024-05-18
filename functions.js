const axios = require('axios');
const baseURL = "https://consumet-anime-api.vercel.app"

async function fetchAnilistAnimeDetails(animeId) {
  
  const url = `${baseURL}/meta/anilist/info/${animeId}`;
  
  try {
    const params = { provider: "gogoanime" };
    const response = await axios.get(url, { params});
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function fetchTrendingAnilistAnime() {
  try {
    const url = `${baseURL}/meta/anilist/trending`;
    const params = { page: 1, perPage: 20 };
    const response = await axios.get(url, { params });
    const data = response.data;
    const results = data.results;

    return results
    
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
}

function formatTitle(title, maxCharacters) {
    maxCharacters = 30
    let newTitle = "";
    let charCount = 0;

    // Split the title into words
    let words = title.split(" ");

    // Iterate through each word
    words.forEach(word => {
        // If adding the word and a space exceeds the maximum character count
        if (charCount + word.length + 1 > maxCharacters) {
            // Add a line break and reset the character count
            newTitle += "<br>";
            charCount = 0;
        }

        // Add the word and a space to the new title
        newTitle += word + " ";
        // Update the character count
        charCount += word.length + 1;
    });

    // Remove the trailing space from the new title
    newTitle = newTitle.trim();

    return newTitle;
}

async function fetchData(id) {
    const query = `
    query ($id: Int) {
      Media (id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        status
        description
        episodes
        nextAiringEpisode {
          id
        }
        streamingEpisodes {
            title
            thumbnail
        }
        duration
        trailer {
            id
            site
        }
        coverImage {
          extraLarge
        }
        bannerImage
        genres
        tags {
          id
          name
        }
        meanScore
      }
    }
    `;

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { id }
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors[0].message);
        }

        const media = data.data.Media;

        // Create an object containing all fetched variables
        const fetchedData = {
            id: media.id,
            title: formatTitle(media.title.english || media.title.romaji || media.title.native),
            startDate: media.startDate,
            endDate: media.endDate,
            status: media.status,
            description: media.description,
            episodes: media.episodes,
            nextAiringEpisode: media.nextAiringEpisode,
            streamingEpisodes: media.streamingEpisodes,
            duration: media.duration,
            trailer: media.trailer,
            coverImage: media.coverImage,
            bannerImage: media.bannerImage,
            genres: media.genres,
            tags: media.tags,
            meanScore: Math.round((media.meanScore / 20) * 2) / 2
        };
      console.log(fetchedData)
        // Return the object containing fetched data
        return fetchedData;

    } catch (error) {
        console.error('Error:', error.message);
        // If an error occurs, you can return null or throw the error
        throw error;
    }
}


module.exports = { fetchAnilistAnimeDetails, fetchTrendingAnilistAnime, fetchData };
