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

        const id = media.id;
        const title = media.title.english || media.title.romaji || media.title.native;
        const startDate = media.startDate;
        const endDate = media.endDate;
        const status = media.status;
        const description = media.description;
        const episodes = media.episodes;
        const nextAiringEpisode = media.nextAiringEpisode;
        const streamingEpisodes = media.streamingEpisodes;
        const duration = media.duration;
        const trailer = media.trailer;
        const coverImage = media.coverImage;
        const bannerImage = media.bannerImage;
        const genres = media.genres;
        const tags = media.tags;
        const meanScore = media.meanScore;
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage:
fetchData(156822); // Pass the ID as an argument to fetchData