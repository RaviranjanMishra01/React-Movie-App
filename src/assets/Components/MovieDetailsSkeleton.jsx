import "./MovieDetailsSkeleton.css";

function MovieDetailsSkeleton() {
  return (
    <div className="skeleton-page">
      {/* Banner */}
      <div className="skeleton-banner"></div>

      {/* Poster + Title */}
      <div className="skeleton-header">
        <div className="skeleton-poster"></div>
        <div className="skeleton-text">
          <div className="line title"></div>
          <div className="line"></div>
          <div className="line short"></div>
        </div>
      </div>

      {/* Cast */}
      <h2 className="skeleton-cast-title"></h2>
      <div className="skeleton-cast">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-cast-card"></div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailsSkeleton;
