import React from 'react';
import { Typography, Tag } from 'antd';
import { format } from 'date-fns';
import RatingBadge from '../RatingBadge/RatingBadge';
import { useGenres } from '../GenresContext';
import './MovieInfoHeader.css';

const { Paragraph } = Typography;

function MovieInfoHeader({ movie }) {
  const { genres } = useGenres();
  const movieGenres =
    genres && movie.genre_ids
      ? genres.filter((genre) => movie.genre_ids.includes(genre.id))
      : [];

  return (
    <div className="movie-info-header">
      <div className="movie-info-title">
        <h5 className="movie-title" title={movie.title}>
          {movie.title}
        </h5>
        <RatingBadge rating={movie.vote_average} />
      </div>
      <Paragraph
        className="movie-info-date"
        style={{ margin: '0', padding: '0' }}
      >
        {movie.release_date
          ? format(new Date(movie.release_date), 'MMMM d, yyyy')
          : 'Дата неизвестна'}
      </Paragraph>
      <div className="movie-info-genres">
        {movieGenres.length > 0 ? (
          movieGenres
            .slice(0, 2)
            .map((genre) => <Tag key={genre.id}>{genre.name}</Tag>)
        ) : (
          <Tag>Неизвестно</Tag>
        )}
      </div>
    </div>
  );
}

export default MovieInfoHeader;
