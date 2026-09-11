import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';
import Spinner from './components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  // Wait 700ms after the user stops typing
  useDebounce(
    () => setDebounceSearchTerm(searchTerm),
    700,
    [searchTerm]
  );

  const fetchMovies = async (query = '') => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === false) {
        setErrorMessage(data.error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`error fetching movies: ${error} `);
      setErrorMessage('Error fetching movies please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(`error fetching movies: ${error} `);
    }
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  // Load trending movies separately
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main className="p-10">
      <div>
        <div className="wrapper">
          <header className="text-center space-y-8">
            <div className="flex items-center justify-center">
              <img
                src="./hero.png"
                alt="Hero Banner"
                className="w-50"
              />
            </div>

            <h1 className="text-4xl font-bold">
              Find{' '}
              <span className="bg-linear-to-t from-sky-500 to-indigo-400 bg-clip-text text-transparent">
                Movies
              </span>{' '}
              That You'll
              <br />
              Enjoy Without Hassle
            </h1>

            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </header>

          {trendingMovies.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold mb-5">
                Trending Movies
              </h2>

              <ul className="flex flex-row overflow-x-auto gap-4 pb-4">
                {trendingMovies.map((movie, index) => (
                  <li
                    key={movie.$id}
                    className="relative shrink-0 w-[150px]"
                  >
                    <p className="absolute -left-1 -bottom-2 text-5xl font-black text-white/10 [-webkit-text-stroke:1.5px_white] leading-none select-none">
                      {index + 1}
                    </p>

                    <img
                      src={movie.poster_url}
                      alt={movie.movie_title}
                      className="w-full h-[200px] object-cover rounded-lg"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-2">
            <h2 className="text-2xl text-muted-foreground font-bold py-5">
              Popular
            </h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movieList.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main >
  );
};

export default App;
