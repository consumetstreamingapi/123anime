const axios = require('axios');

async function fetchTrendingAnilistAnime() {
  try {
    const url = "https://streamingapi.vercel.app/meta/anilist/trending";
    const params = { page: 1, perPage: 20 };
    const response = await axios.get(url, { params });
    const data = response.data;
    const results = data.results;

    return results;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
}

// Test the function
async function testFetchTrendingAnilistAnime() {
  try {
    const trendingAnime = await fetchTrendingAnilistAnime();
    console.log('Trending Anime:', trendingAnime);
  } catch (error) {
    console.error('Error testing fetchTrendingAnilistAnime:', error);
  }
}

// Run the test
testFetchTrendingAnilistAnime();
