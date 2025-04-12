import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import LoadingSpinner from '../LoadingSpinner';
import ShowAlert from '../ShowAlert/ShowAlert';
import PaginationComponent from '../PaginationComponent';

function RatedMovies({
  ratedMovies,
  fetchRatedMovies,
  totalPages,
  setRatedMovies,
  guestSessionId,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        await fetchRatedMovies(page);
      } catch {
        setError('Не удалось загрузить оцененные фильмы.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchRatedMovies, page]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ShowAlert message={error} type="error" />;

  return (
    <div style={{ maxWidth: '1010px', margin: '0 auto' }} className="movie">
      <div
        className={`movie-list ${ratedMovies.length === 1 ? 'centered' : ''}`}
      >
        {ratedMovies.map((movie) => (
          <div key={movie.id} className="movie-card-wrapper">
            <MovieCard
              movie={movie}
              guestSessionId={guestSessionId}
              rating={movie.rating}
              onRateSuccess={(value) => {
                setRatedMovies((prev) =>
                  prev.map((m) =>
                    m.id === movie.id ? { ...m, rating: value } : m,
                  ),
                );
              }}
            />
          </div>
        ))}
      </div>
      <div className="pagination-wrapper">
        <PaginationComponent
          current={page}
          total={totalPages * 20}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default RatedMovies;
