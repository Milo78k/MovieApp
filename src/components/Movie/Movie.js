import React, { useEffect, useState } from 'react';
import { Row } from 'antd';

import MovieCard from '../MovieCard';
import LoadingSpinner from '../LoadingSpinner';
import ShowAlert from '../ShowAlert/ShowAlert';

function Movie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMovies = () => {
    if (!navigator.onLine) {
      setError('Нет подключения к интернету');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=716129ae124d90d45aa6c2493a69e577&query=return',
    )
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        return res.json();
      })
      .then((json) => {
        setMovies(json.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof TypeError) {
          setError('Ошибка сети. Проверьте подключение к интернету.');
        } else {
          setError('Не удалось загрузить данные.');
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();

    const handleOnline = () => {
      setError('');
      fetchMovies(); // Перезагружаем данные, если сеть восстановлена
    };

    const handleOffline = () => {
      setError('Подключение потеряно. Проверьте интернет соединение');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ShowAlert message={error} type="error" />;
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#FAFAFA',
        padding: '20px',
      }}
    >
      <Row gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Row>
    </div>
  );
}

export default Movie;
