import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import { createGuestSession } from '../../api/guestSession';
import { fetchRatedMovies } from '../../api/ratedMovies';
import Movie from '../Movie';
import RatedMovies from '../RatedMovies';
import { GenresProvider } from '../GenresContext';

function App() {
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [totalPages, setTotalPages] = useState(0);

  // Создание гостевой сессии
  const createGuestSessionHandler = useCallback(async () => {
    const sessionId = await createGuestSession();
    setGuestSessionId(sessionId);
  }, []);

  // Получение оцененных фильмов
  const fetchRatedMoviesData = useCallback(
    async (page = 1) => {
      if (!guestSessionId) {
        await createGuestSessionHandler();
      }

      const result = await fetchRatedMovies(guestSessionId, page);
      if (result) {
        setRatedMovies(result.movies);
        setTotalPages(result.totalPages);
      }
    },
    [guestSessionId, createGuestSessionHandler],
  );

  const handleRatingUpdate = () => {
    fetchRatedMoviesData();
  };

  useEffect(() => {
    if (activeTab === '2') {
      fetchRatedMoviesData();
    }
  }, [activeTab, fetchRatedMoviesData]);

  useEffect(() => {
    if (!guestSessionId) {
      createGuestSessionHandler();
    }
  }, [guestSessionId, createGuestSessionHandler]);

  return (
    <GenresProvider>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={[
          {
            key: '1',
            label: 'Search',
            children: (
              <Movie
                guestSessionId={guestSessionId}
                onRateSuccess={handleRatingUpdate}
              />
            ),
          },
          {
            key: '2',
            label: 'Rated',
            children: (
              <RatedMovies
                ratedMovies={ratedMovies}
                fetchRatedMovies={fetchRatedMoviesData}
                totalPages={totalPages}
              />
            ),
          },
        ]}
      />
    </GenresProvider>
  );
}

export default App;
