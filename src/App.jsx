import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import Moviesboxs from "./assets/Components/Moviesboxs";
import MoviesboxsSkeleton from "./assets/Components/MoviesboxsSkeleton";
import images from "./assets/images/Allimage";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [changeindex, setchangeindex] = useState(1);
  const [collectMovies, setCollectMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ----------------------------------
     Fetch latest movies (HOME)
  ----------------------------------- */
  useEffect(() => {
    if (query) return; // do not fetch latest when searching

    const fetchLatestMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=IN&page=${changeindex}`
        );
        const data = await res.json();
        setCollectMovies(data.results || []);
      } catch {
        setError("Failed to fetch latest movies");
      } finally {
        setTimeout(() => {
          setLoading(false);
        },1000);
      }
    };

    fetchLatestMovies();
  }, [query, changeindex]);

  /* ----------------------------------
     Fetch search movies from URL
  ----------------------------------- */
  useEffect(() => {
    if (!query) {
      setSearchMovies([]);
      return;
    }

    const fetchSearchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`
        );
        const data = await res.json();

        if (!data.results?.length) {
          setSearchMovies([]);
          setError("No movies found");
          return;
        }

        setSearchMovies(data.results);
      } catch {
        setError("Search failed. Check internet connection");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchSearchMovies();
  }, [query, changeindex]);

  /* ----------------------------------
     Sync input with URL
  ----------------------------------- */
  useEffect(() => {
    setMovie(query);
  }, [query]);

  /* ----------------------------------
     Search submit (URL driven)
  ----------------------------------- */
  const handleSearch = (e) => {
    e.preventDefault();

    if (!movie.trim()) {
      alert("Please enter a movie name");
      return;
    }

    setSearchParams({ q: movie.trim() });
  };

  /* ----------------------------------
     Movie click
  ----------------------------------- */
  const handleSelectMovie = (id) => {
    navigate(`/movie/${id}`);
  };

  const setindex = (direction) => {
    setchangeindex((prev) => {
        
      if(prev >= 6)
      {
        alert("indexing not available");
        return 1
      }

      if (direction === -1 && prev === 1) return 1;
      return prev + direction;
    });
  };

  return (
    <div className="main">
      {/* HEADER */}
      <div className="Top_inputbox">
        <Link to="/">
          <h3 onClick={()=>{setchangeindex(1)}}>Movies 4u</h3>
        </Link>

        <form className="inputboxs" onSubmit={handleSearch}>
          <input
            type="text"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* TITLE */}
      <div className="leatesmovies">
        <img className="fireimage" src={images[4]} alt="latest" />
        <h3>{query ? "Search Results" : "Movies4u Releases"}</h3>
      </div>

      {/* LOADER */}
      {loading && <MoviesboxsSkeleton />}

      {/* ERROR */}
      {error && (
        <div
          style={{ textAlign: "center", fontSize: "2rem", marginTop: "15vh", height:"25vh" }}
        >
          {error}
        </div>
      )}

      {/* MOVIE LIST */}
      <div className="searchresult">
        {(query ? searchMovies : collectMovies).map((m) => (
          <Moviesboxs
            key={m.id}
            id={m.id}
            title={m.title}
            year={m.release_date?.split("-")[0]}
            poster={
              m.poster_path
                ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                : images[0]
            }
            rating={m.vote_average}
            lang={m.original_language}
            onSelect={handleSelectMovie}
          />
        ))}
      </div>
      <div className="countinglist">
        <div className="btnmove">
          <img
            src={images[5]}
            onClick={() => {
              setindex(-1);
            }}
            alt=""
          />
        </div>
        <span>{changeindex}</span>
        <div className="btnmove">
          <img
            src={images[6]}
            onClick={() => {
              setindex(1);
            }}
            alt=""
          />
        </div>
      </div>
      {/* FOOTER */}
      <footer className="footer">
        <p>Movies4u – Explore movies and cast details</p>
        <p>Powered by TMDB API</p>
        <p>
          Built by <b>Raviranjan Kumar ❤️</b>
        </p>
        <ul>
          <li>
            <a
              href="https://github.com/RaviranjanMishra01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={images[1]} alt="GitHub" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/raviranjanmishra01/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={images[3]} alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a href="mailto:raviranjanmishra768@gmail.com">
              <img src={images[2]} alt="Email" />
            </a>
          </li>
        </ul>
        <small>© 2025 Movies4u</small>
      </footer>
    </div>
  );
}

export default App;
