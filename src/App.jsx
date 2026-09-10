import React, { useEffect, useState } from 'react'
import Search from './components/search'

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {

      setIsLoading(true);
      setErrorMessage('');

      const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === false) {
        setErrorMessage(data.error || 'Failed to fetch movies');
        setMovieList([]); //if not exist set to empty
        return;
      }

      setMovieList(data.results || []) //save the result to the use state hook

    } catch (error) {
      console.log(`error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies please try again later`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className='flex items-center justify-center'>
      <div className="pattern">
        <div className="wrapper">

          <header className='text-center space-y-8'>
            <div className='flex items-center justify-center'>
              <img src="./logo1.png" alt="Hero Banner" className='w-50' />

            </div>

            <h1 className='text-4xl font-bold'>
              Find <span className='bg-linear-to-t from-sky-500 to-indigo-400 bg-clip-text text-transparent'>Movies</span> That You'll
              <br />
              Enjoy Without Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='mt-10'>
            <h2 className='text-2xl text-muted-foreground font-bold py-5 mt-40'>
              List of trending Movies
            </h2>

            {isLoading ? (
              <p>Loading</p>
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                {movieList.map((movie) => (
                  <p>{movie.title}</p>
                ))}
              </ul>
            )}

          </section>

        </div>
      </div>
    </main >
  )
}

export default App