import React from 'react';
import { Card, Row, Col } from 'antd';

import MoviePoster from '../MoviePoster';
import MovieInfo from '../MovieInfo';

function MovieCard({ movie }) {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
      <Card
        hoverable
        style={{
          maxWidth: '451px',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Row
          gutter={[16, 16]}
          align="top"
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            height: '100%',
          }}
        >
          <Col xs={10} sm={10} md={10} style={{ height: '100%' }}>
            <MoviePoster movie={movie} />
          </Col>
          <Col xs={14} sm={14} md={14} style={{ padding: '0 16px 0 16px' }}>
            <MovieInfo movie={movie} />
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
export default MovieCard;
