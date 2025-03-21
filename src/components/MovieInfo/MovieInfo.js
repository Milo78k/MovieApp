import React from 'react';
import { Typography, Tag } from 'antd';
import { format } from 'date-fns';

const { Title, Paragraph } = Typography;

const truncateText = (text, maxLength) => {
  if (!text) return 'Описание отсутствует';
  if (text.length <= maxLength) return text;

  const words = text.split(' ');
  const truncatedText = words
    .slice(
      0,
      words.findIndex(
        (_, i) => words.slice(0, i + 1).join(' ').length > maxLength,
      ),
    )
    .join(' ');

  return `${truncatedText}...`;
};

function MovieInfo({ movie }) {
  return (
    <div style={{ padding: '0 16px' }}>
      <Title level={5}>{movie.title}</Title>
      <Paragraph type="secondary" style={{ color: '#827E7E' }}>
        {movie.release_date
          ? format(new Date(movie.release_date), 'MMMM dd, yyyy')
          : 'Дата неизвестна'}
      </Paragraph>
      <div>
        <Tag>Action</Tag>
        <Tag>Drama</Tag>
      </div>
      <Paragraph
        ellipsis={{ rows: 6, expandable: true }}
        style={{ marginTop: 10, fontSize: '12px' }}
      >
        {truncateText(movie.overview, 200)}
      </Paragraph>
    </div>
  );
}

export default MovieInfo;
