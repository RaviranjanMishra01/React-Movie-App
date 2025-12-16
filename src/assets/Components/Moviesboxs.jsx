import "./Moviesboxs.css";

function Moviesboxs({ id, title, lang, poster, rating, year, onSelect }) {
  return (
    <div className="box" onClick={() => onSelect(id)}>
      <div className="images">
        <img src={poster} alt={title} />
      </div>

      <div className="aboutmovie">
        <p>{title} ({year})</p>
        <p>⭐ {Math.trunc(rating)}/10</p>
        <p>Language: {lang}</p>
      </div>
    </div>
  );
}

export default Moviesboxs;
