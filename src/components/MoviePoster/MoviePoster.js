import React, { useState } from 'react';

const placeholderImage = 'https://via.placeholder.com/451x279?text=No+Image';

function MoviePoster({ movie }) {
  const [imgSrc, setImgSrc] = useState(
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  );

  return (
    <div style={{ height: '100%' }}>
      <img
        src={imgSrc}
        alt={movie.title}
        onError={() => setImgSrc(placeholderImage)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default MoviePoster;
