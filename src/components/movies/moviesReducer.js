import firebase from "firebase";
import axios from "axios";
import utils from "./utils";

const initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITILIZE_MOVIES_INTO_FIREBASE":
      action.payload.forEach((movie) => {
        firebase
          .firestore()
          .collection("Movies")
          .add({
            Name: movie.name,
            Premiered: movie.premiered,
            Genres: movie.genres,
            Image: movie.image.medium,
          })
          .then((status) => {
            
            console.log("Initialize Movies Into FireBase");
          });

      });
      return state

    case "ADD_ALL_MOVIES":
      return { ...state, movies: action.payload };

    case "DELETE_MOVIE":
      let updatedMovies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      return { ...state, movies: updatedMovies };

    case "UPDATE_MOVIE":
        let movies2 = state.movies.map(movie => {
            if (movie.id === action.payload.id) {
                return action.payload.movie
            }
            return movie
        })
        return {...state, movies: movies2}


    case "ADD_MOVIE":
      let movies = state.movies
      movies.push(action.payload)
      return {...state, movies: movies}
    
    default:
      return state;
  }
};

export default moviesReducer;
