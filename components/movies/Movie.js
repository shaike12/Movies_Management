import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CardMedia,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import LoadingBarComp from "../LoadingBar";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 345,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 440,
  },
});

const MovieComp = ({ movie }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Delete Movie From Firebase
  const deleteMovie = async (id) => {
    setIsLoading(true);
    let docRef = await firebase.firestore().collection("Movies").doc(id);
    docRef
      .delete()
      .then((doc) => {
        dispatch({ type: "DELETE_MOVIE", payload: id });
        setIsLoading(false);
        console.log("Movie Seccessfully Deleted!");
      })
      .catch((err) => {
        console.log("Error Removing Movie: ", err);
      });
  };

  return (
    <Card className={classes.root} variant='outlined'>
      {isLoading ? (
        <LoadingBarComp />
      ) : (
        <CardContent>
          <Typography variant='h5'>
            {movie.Name}, {movie.Premiered.split("-")[0]}
          </Typography>
          <p>Genres: {movie.Genres.map((genre) => '"' + genre + '", ')}</p>
          <CardMedia
            className={classes.media}
            image={movie.Image}
            title={movie.Name}
          />
          <br />
          <CardActions>
            <Button
              component={Link}
              to={`/movies/movie/edit/${movie.id}`}
              variant='contained'
              color='primary'
              size='small'
              
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => deleteMovie(movie.id)}
            >
              Delete
            </Button>
          </CardActions>
        </CardContent>
      )}
    </Card>
  );
};

export default MovieComp;
