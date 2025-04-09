import axios from 'axios';
import { createGuestSession } from './guestSession';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';

// Функция для получения оцененных фильмов
export const fetchRatedMovies = async (guestSessionId, page = 1) => {
  let sessionId = guestSessionId;

  // Если sessionId пустой, создаем новый
  if (!sessionId) {
    sessionId = await createGuestSession();
    if (!sessionId) return null;
  }

  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&page=${page}`,
    );
    return {
      movies: res.data.results || [],
      totalPages: res.data.total_pages,
    };
  } catch (err) {
    console.error('Ошибка загрузки оцененных фильмов:', err);
    return null;
  }
};
