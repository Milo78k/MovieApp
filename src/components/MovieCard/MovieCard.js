import React, { useState, useEffect } from 'react';
import MoviePoster from '../MoviePoster';
import MovieInfoHeader from '../MovieInfoHeader';
import MovieInfoDescription from '../MovieInfoDescription';
import Rating from '../Rating';
import { rateMovie } from '../../api/rateMovie';
import './MovieCard.css';

function MovieCard({ movie, guestSessionId, rating: initialRating }) {
  const [rating, setRating] = useState(initialRating || movie.rating || 0);

  useEffect(() => {
    setRating(movie.rating);
  }, [movie.rating]);

  const handleRate = async (value) => {
    try {
      await rateMovie(movie.id, value, guestSessionId);
      setRating(value);
    } catch (err) {
      console.error('Ошибка при оценке фильма:', err);
    }
  };

  return (
    <div className="movie-card">
      <div className="poster-container">
        <MoviePoster movie={movie} />
      </div>
      <div className="info-header">
        <MovieInfoHeader movie={movie} rating={rating} />
      </div>
      <div className="movie-description">
        <MovieInfoDescription
          movie={movie}
          rating={rating}
          rateMovie={handleRate}
        />
      </div>
      <div className="movie-rating">
        <Rating value={rating} onChange={handleRate} />
      </div>
    </div>
  );
}

export default MovieCard;
