import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col } from 'antd';
import MovieCard from '../MovieCard';
import LoadingSpinner from '../LoadingSpinner';
import ShowAlert from '../ShowAlert/ShowAlert';
import PaginationComponent from '../PaginationComponent';
import SearchInput from '../ SearchInput';
import './Movie.css';
import { searchMovies } from '../../api/movies';

function Movie({ guestSessionId, handleRatingUpdate }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ShowAlert message={error} type="error" />;

  return (
    <div className="movie">
      <SearchInput query={query} setQuery={setQuery} setPage={setPage} />
      {movies.length === 0 && query && !loading && <p>Ничего не найдено</p>}
      <Row gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <Col
            key={movie.id}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            style={{ margin: '0' }}
          >
            <MovieCard
              movie={movie}
              guestSessionId={guestSessionId}
              onRateSuccess={handleRatingUpdate}
            />
          </Col>
        ))}
      </Row>
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
