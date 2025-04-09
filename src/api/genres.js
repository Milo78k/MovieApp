import axios from 'axios';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';

export const fetchGenres = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    return res.data.genres;
  } catch (err) {
    console.error('Ошибка при загрузке жанров:', err);
    return [];
  }
};
