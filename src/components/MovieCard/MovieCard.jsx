import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>
        <FaStar /> {movie.vote_average.toFixed(1)}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
