import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const AddMovieComp = () => {
  const [movie, setMovie] = useState({Name: '', Premiered: '', Image: '', Genres: []});
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    
  }, []);

  const add = () => {
      let docRef = firebase.firestore().collection("Movies")
      docRef
      .add(movie)
      .then(() => {
          dispatch({ type: "ADD_MOVIE", payload: movie});
            console.log("Movie Seccessfully Added!");
            history.push('/movies/all_movies')
      })
      .catch((err) => {
        console.log("Error Adding Movie: ", err);
      });
  };

  return (
    <div>
      <form>
        Name:{" "}
        <input
          type='text'
          value={movie.Name}
          onChange={(e) => setMovie({ ...movie, Name: e.target.value })}
        /><br/>
        Premiered:{" "}
        <input
          type='text'
          value={movie.Premiered}
          onChange={(e) => setMovie({ ...movie, Premiered: e.target.value })}
        /><br/>
        Image:{" "}
        <input
          type='text'
          value={movie.Image}
          onChange={(e) => setMovie({ ...movie, Image: e.target.value })}
        /><br/>
        Genres:{" "}
        <input
          type='text'
          value={movie.Genres}
          onChange={(e) =>
            setMovie({ ...movie, Genres: e.target.value.split(",") })
          }
        /><br/>
        <Button onClick={add}>Add</Button>
        <Button onClick={() => history.push("/movies/all_movies")}>Cancel</Button>
      </form>
    </div>
  );
};

export default AddMovieComp;
