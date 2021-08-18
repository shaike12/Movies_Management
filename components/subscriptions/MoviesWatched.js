import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
const MoviesWatchedComp = ({ watchedMovies }) => {
  const moviesStore = useSelector((state) => state.movies);
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    if (watchedMovies.length > 0) {
      watchedMovies.forEach(async (movie) => {
        let movieName = await getMovieNameById(movie.MovieID);
        movie.Name = movieName;
      });
      setmovies(watchedMovies);
    }
  }, []);

  const getMovieNameById = async (id) => {
    return await firebase
      .firestore()
      .collection("Movies")
      .doc("VtDy2Bd7I0SeKsIgy1oB")
      .get()
      .then((movie) => movie.data().Name);
  };

  return (
    <div>
      <h3>Movies Watched</h3>
      <button>Subscribe To New Movie</button>
      <br />
      <ul>
        {movies.map((item, index) => {
          return (
            <li key={index}>
              {item.Name}, {item.Date}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoviesWatchedComp;
