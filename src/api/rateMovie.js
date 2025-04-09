import axios from 'axios';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTYxMjlhZTEyNGQ5MGQ0NWFhNmMyNDkzYTY5ZTU3NyIsIm5iZiI6NjdkOTU5NzgxYmI0YjVjNThiYzZhOTg4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7QkQv0DjprVfZOyYNk9ZOi6Uo1filUu2mmY';

export async function rateMovie(movieId, value, guestSessionId) {
  if (!guestSessionId) {
    console.error('Нет guestSessionId');
    return;
  }

  try {
    await axios.post(
      `https://api.themoviedb.org/3/movie/${movieId}/rating`,
      { value },
      {
        params: {
          api_key: API_KEY,
          guest_session_id: guestSessionId,
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: AUTH_TOKEN,
        },
      },
    );
  } catch (error) {
    console.error('Ошибка при оценке фильма:', error);
  }
}
