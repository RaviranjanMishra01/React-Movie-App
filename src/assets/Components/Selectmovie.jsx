import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Selectmovie.css";
import errimg from "../images/err.png"
import MovieDetailsSkeleton from "./MovieDetailsSkeleton";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/";

function Selectmovie() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [showFallback, setShowFallback] = useState(false);

  //second delay before showing "not available"
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch movie + cast
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const movieRes = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        const castRes = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
        );
        const castData = await castRes.json();
        setCast(castData.cast || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
  }, [id]);

  // Loader (first 5 seconds)
  if (!movie && !showFallback) {
    return (
      < MovieDetailsSkeleton />
    );
  }

  //  Fallback after 5 seconds
  if (!movie && showFallback) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <h2>Movie detail not available</h2>
      </div>
    );
  }

  return (
    <div className="main">
      <div style={{ background: "#111", color: "#fff", minHeight: "100vh" }}>
        {/* Movie Banner */}
        <div className="imageparts">
          {movie.backdrop_path && (
            <img
              loading="lazy"
              src={`${IMG_URL}original${movie.backdrop_path}`}
              alt="banner"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "scale-down",
              }}
            />
          )}

          {/* Movie Poster */}
          {movie.poster_path && (
            <img
              src={`${IMG_URL}w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "250px", marginTop: "-120px" }}
            />
          )}
        </div>

        <h1 className="movietitle">{movie.title}</h1>
        <p className="overview">Movie-overview : {movie.overview}</p>

        {/* Cast Section */}
        <h2 className="Casts">Cast</h2>
        <div className="allacters">
          {cast.slice(0, 6).map((actor) => (
            <div key={actor.id} style={{ width: "120px" }}>
              <img
                src={
                  actor.profile_path
                    ? `${IMG_URL}w185${actor.profile_path}`
                    : errimg
                }
                alt={actor.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>{actor.name}</p>
              <small>{actor.character}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Selectmovie;
