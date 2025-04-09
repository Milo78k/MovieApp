import axios from 'axios';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';

export const createGuestSession = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`,
    );
    return res.data.guest_session_id;
  } catch (err) {
    console.error('Ошибка создания гостевой сессии:', err);
    return null;
  }
};
