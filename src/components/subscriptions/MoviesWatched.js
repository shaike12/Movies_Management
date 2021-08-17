import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
const MoviesWatchedComp = (props) => {
  const moviesStore = useSelector((state) => state.movies);
  const [movies, setmovies] = useState([]);

  useEffect(async() => {
    //   console.log(await props.watchedMovies[0].MovieID);
    // //   let x = await getMovieNameById(props.watchedMovies[0].MovieID)
  }, []);

  const getMovieNameById = async (id) => {
            let movieName = await firebase
                .firestore()
                .collection("Movies")
                .doc(id)
                .get()
                .then(movie => movie.data().Name)
            console.log("Movie Name", movieName);
            return movieName
  }

  return (
    <div>
      <h3>Movies Watched</h3>
      <button>Subscribe To New Movie</button>
      <br />
      <ul>
        {movies.map((item, index) => {
          return (
            <li key={index}>
              {item.name}, {item.date}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoviesWatchedComp;
