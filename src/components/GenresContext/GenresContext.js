import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { fetchGenres } from '../../api/genres';

const GenresContext = createContext();

export function GenresProvider({ children }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };

    loadGenres();
  }, []);

  const value = useMemo(() => ({ genres }), [genres]);

  return (
    <GenresContext.Provider value={value}>{children}</GenresContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenresContext);
}
