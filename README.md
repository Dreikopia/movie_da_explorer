# Movie Search

A movie search web app built with **React** and **Appwrite**, using **The Movie Database (TMDB) API** to search for movies and display popular and trending movies.

This project was created as a learning project to practice the fundamentals of React, while also learning how a frontend application can communicate with an external API and a backend service.

## Features

* Search for movies using the TMDB API
* Debounced movie search to avoid making a request on every keystroke
* Display popular movies
* Display trending movies based on searches
* Track movie searches using Appwrite
* Responsive movie grid
* Horizontal trending movie section
* Loading and error states
* Movie poster and movie information display

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript
* Lucide React
* React Use

### Backend

* Appwrite
* Appwrite Databases

### API

* TMDB API

## How It Works

The application uses two main sources of data:

```text
                    ┌─────────────────┐
                    │   React App     │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
       ┌─────────────┐               ┌─────────────┐
       │  TMDB API   │               │  Appwrite   │
       └──────┬──────┘               └──────┬──────┘
              │                             │
              ▼                             ▼
       Movie information              Search tracking
       Popular movies                 Trending searches
```

### Movie Search

When a user searches for a movie:

1. The user enters a search term.
2. React stores the search term in state.
3. The search is debounced for 700ms.
4. The application sends a request to the TMDB API.
5. The results are stored in React state.
6. The movie list is rendered to the page.
7. The search is recorded in Appwrite.

### Trending Movies

Appwrite is used to keep track of searches.

When a movie is searched, the application updates the search count in Appwrite.

This allows the application to determine which movies are being searched for most frequently and display them in the **Trending Movies** section.

```text
User searches "Interstellar"
          ↓
      TMDB API
          ↓
     Movie results
          ↓
     Appwrite
          ↓
Search count increases
          ↓
Popular searches become
Trending Movies
```

## React Concepts Practiced

This project focuses on learning the fundamentals of React.

### Components

The application is separated into reusable components.

For example:

```jsx
<Search
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
```

and:

```jsx
<MovieCard
  movie={movie}
/>
```

This helped me understand how React applications can be divided into smaller, reusable pieces.

### Props

Props are used to pass data from a parent component to a child component.

For example:

```jsx
<MovieCard movie={movie} />
```

The `movie` object is passed to the `MovieCard` component as a prop.

### State

The application uses `useState` to store data that changes while the application is running.

Examples include:

```jsx
const [searchTerm, setSearchTerm] = useState('');
const [movieList, setMovieList] = useState([]);
const [trendingMovies, setTrendingMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
```

This helped me understand how React manages changing data and updates the UI when state changes.

### useEffect

`useEffect` is used to perform actions when certain values change or when the component loads.

For example:

```jsx
useEffect(() => {
  fetchMovies(debounceSearchTerm);
}, [debounceSearchTerm]);
```

This allows the application to fetch movies whenever the debounced search term changes.

### Event Handling

The application handles user interactions such as typing into the search field.

The search component updates the parent's state when the user enters a search term.

### Rendering Lists

Movie results are rendered using JavaScript's `map()` method:

```jsx
movieList.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={movie}
  />
))
```

This helped me understand how React renders dynamic data.

### Conditional Rendering

The application displays different content depending on the current state.

For example:

```jsx
{isLoading ? (
  <p>Loading...</p>
) : errorMessage ? (
  <p>{errorMessage}</p>
) : (
  <MovieList />
)}
```

This is used for loading states, errors, and movie results.

### Async/Await

The application uses `async` and `await` when communicating with APIs:

```jsx
const response = await fetch(endpoint, API_OPTIONS);
const data = await response.json();
```

This helped me understand asynchronous JavaScript and API requests.

### Debouncing

The search input uses a 700ms debounce.

Instead of making a request every time the user types:

```text
I
In
Int
Inte
Inter
Interstellar
```

the application waits until the user stops typing before making the request.

```text
User types
    ↓
Wait 700ms
    ↓
Search TMDB
    ↓
Display results
```

This reduces unnecessary API requests.

## Appwrite

Appwrite is used as the backend service for storing search information.

The application uses Appwrite to track how frequently movies are searched.

Example data:

```text
Movie                  Search Count
------------------------------------
Interstellar              25
Inception                 18
The Dark Knight           15
Avatar                    11
```

The search data can then be used to determine which movies should appear in the trending section.

## Environment Variables

The application uses environment variables for sensitive configuration values.

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

Do **not** commit your `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd my-first-react-app
```

Install dependencies:

```bash
npm install
```

Create your environment variables:

```bash
.env
```

Add the required TMDB and Appwrite values.

Start the development server:

```bash
npm run dev
```

The application will then be available through the local Vite development server.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Build

```bash
npm run build
```

Creates an optimized production build of the React application.

### Lint

```bash
npm run lint
```

Checks the project for ESLint errors and warnings.

### Preview

```bash
npm run preview
```

Runs the production build locally so it can be tested before deployment.

## Project Structure

A simplified version of the project structure:

```text
my-first-react-app/
│
├── public/
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Search.jsx
│   │   └── MovieCard.jsx
│   │
│   ├── appwrite.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## Learning Goals

The main goal of this project is not to create a production-level movie platform.

The goal is to understand the fundamentals of building a React application.

Through this project, I am practicing:

* React components
* JSX
* Props
* State
* `useState`
* `useEffect`
* Event handling
* Conditional rendering
* List rendering
* `map()`
* Async JavaScript
* API requests
* `fetch()`
* Environment variables
* Debouncing
* Backend integration
* Appwrite
* Git and GitHub
* Production builds
* Deployment

## Future Improvements

Possible features to add in the future:

* Movie details page
* Movie trailers
* Genre filtering
* Rating display
* Pagination
* Favorites/watchlist
* User authentication
* Better search suggestions
* Search history
* Improved trending algorithm
* Mobile navigation
* Movie recommendations
* Watch provider information

## What I Learned

This project helped me understand that React is primarily about building the UI around **state and data**.

The basic flow of the application is:

User interaction
      ↓
React state changes
      ↓
React re-renders
      ↓
API request
      ↓
Data received
      ↓
State updated
      ↓
UI updates

I also learned how a React frontend can communicate with both an external API such as TMDB and a backend service such as Appwrite.

