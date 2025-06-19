// api.js - Funciones para consultar RAWG API

const API_URL = 'https://api.rawg.io/api';

async function fetchPopularGames() {
  try {
    const res = await fetch(`${API_URL}/games?key=${API_KEY}&ordering=-added,-metacritic&page_size=10`);
    if (!res.ok) throw new Error('Error fetching Popular Games');
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchGamesBySearch(query) {
  try {
    const res = await fetch(`${API_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=20`);
    if (!res.ok) throw new Error('Error loading Games by Search');
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchGameDetails(id) {
  try {
    const res = await fetch(`${API_URL}/games/${id}?key=${API_KEY}`);
    if (!res.ok) throw new Error('Error fetching Game Details');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
