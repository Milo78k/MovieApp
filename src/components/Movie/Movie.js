import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from '../MovieCard';
import LoadingSpinner from '../LoadingSpinner';
import ShowAlert from '../ShowAlert/ShowAlert';
import PaginationComponent from '../PaginationComponent';
import SearchInput from '../ SearchInput';
import './Movie.css';
import { searchMovies } from '../../api/movies';

function Movie({ guestSessionId, handleRatingUpdate, setRatedMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [userRatings, setUserRatings] = useState({});

  const fetchMovies = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const { movies: fetchedMovies, totalResults: fetchedTotal } =
        await searchMovies(query, page);
      setMovies(fetchedMovies);
      setTotalResults(fetchedTotal);
    } catch {
      setError('Не удалось загрузить данные.');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  const handleRate = (movieId, value, movieData) => {
    setUserRatings((prev) => ({
      ...prev,
      [movieId]: value,
    }));
    setRatedMovies?.((prev) => {
      const alreadyRated = prev.find((m) => m.id === movieId);
      if (alreadyRated) {
        return prev.map((m) =>
          m.id === movieId ? { ...m, rating: value } : m,
        );
      }

      return [...prev, { ...movieData, rating: value }];
    });
    handleRatingUpdate?.();
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ShowAlert message={error} type="error" />;

  return (
    <div className="movie">
      <SearchInput query={query} setQuery={setQuery} setPage={setPage} />
      {movies.length === 0 && query && !loading && <p>Ничего не найдено</p>}

      <div className={`movie-list ${movies.length === 1 ? 'centered' : ''}`}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card-wrapper">
            <MovieCard
              movie={movie}
              guestSessionId={guestSessionId}
              onRateSuccess={(value) => handleRate(movie.id, value, movie)}
              rating={userRatings[movie.id] ?? movie.rating}
            />
          </div>
        ))}
      </div>

      <div className="pagination-wrapper">
        <PaginationComponent
          current={page}
          total={totalResults}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default Movie;
