import { useEffect, useState } from "react";
import {
  BsCalendar3,
  BsFillFileEarmarkTextFill,
  BsFilm,
  BsGraphUp,
  BsHourglassSplit,
  BsWallet2,
} from "react-icons/bs";
import { useParams } from "react-router-dom";

import MovieCard from "../../components/MovieCard/MovieCard";

import "./Movie.css";

const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState("");

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    let date = new Date(data.release_date);

    data.release_date = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });

    let genresString = data?.genres.map((genre, i) =>
      i === 0 ? genre.name : genre.name.toLowerCase()
    );

    setGenres(genresString.join().replaceAll(",", ", "));

    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-Us", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieURL = `https://api.themoviedb.org/3/movie/${id}?${apiKey}`;
    getMovie(movieURL);
  }, []);

  return (
    <div className="movie-page">
      {movie === null && <p>Carregando...</p>}
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsCalendar3 /> Lançamento:
            </h3>
            <p>{movie.release_date}</p>
          </div>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info">
            <h3>
              <BsFilm /> Gênero(s):
            </h3>
            <p>{genres}</p>
          </div>
          <div className="description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
