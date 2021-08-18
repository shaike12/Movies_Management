import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const EditMovieComp = () => {
  const [movie, setMovie] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    async function fetchData(){
    await firebase
      .firestore()
      .collection("Movies")
      .doc(id)
      .get()
      .then((doc) => {
          setMovie(doc.data());
        
      });
    }
    fetchData()

  }, []);

  const update = async () => {
      let docRef = await firebase.firestore().collection("Movies").doc(id);
      docRef
      .set(movie)
      .then(() => {
          dispatch({ type: "UPDATE_MOVIE", payload: { movie, id } });
            console.log("Movie Seccessfully Updated!");
            history.push('/movies/all_movies')
      })
      .catch((err) => {
        console.log("Error Updating Movie: ", err);
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
        <Button onClick={update}>Update</Button>
        <Button onClick={() => history.push("/movies/all_movies")}>Cancel</Button>
      </form>
    </div>
  );
};

export default EditMovieComp;
