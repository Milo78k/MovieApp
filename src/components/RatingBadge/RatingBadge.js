import React from 'react';
import './RatingBadge.css';

export default function RatingBadge({ rating }) {
  const safeRating = typeof rating === 'number' ? rating : 0;
  const formattedRating = safeRating.toFixed(1);

  const getBorderColor = (value) => {
    if (value >= 7) return '#66E900';
    if (value >= 5) return '#E9D100';
    if (value >= 3) return '#E97E00';
    return '#E90000';
  };

  return (
    <div
      className="rating-badge"
      style={{ border: `2px solid ${getBorderColor(safeRating)}` }}
    >
      {formattedRating}
    </div>
  );
}
