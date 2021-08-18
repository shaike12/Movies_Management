import firebase from "firebase";



const movies = (state = [], action) => {
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
      return action.payload;

    case "DELETE_MOVIE":
      let updatedMovies = state.filter(
        (movie) => movie.id !== action.payload
      );
      return updatedMovies;

    case "UPDATE_MOVIE":
        let movies2 = state.map(movie => {
            if (movie.id === action.payload.id) {
                return action.payload.movie
            }
            return movie
        })
        return movies2


    case "ADD_MOVIE":
      let movies3 = state
      movies3.push(action.payload)
      return movies3
  
    default:
      return state;
  }
};

export default movies;
