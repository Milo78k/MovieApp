const API_KEY = '716129ae124d90d45aa6c2493a69e577';

export async function searchMovies(query, page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }

    const json = await response.json();
    return {
      movies: json.results,
      totalResults: json.total_results,
    };
  } catch (error) {
    console.error('Ошибка при поиске фильмов:', error);
    throw error;
  }
}
