import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CardMedia,
  
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";


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

function LinearProgressWithLabel(props) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStylesMovie = makeStyles({
  root: {
    width: "80%",
    margin: "80px auto",
  },
});

const MovieComp = ({ movie, update }) => {
  const classes = useStyles();
  const classes2 = useStylesMovie();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = React.useState(10);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Delete Movie From Firebase
  const deleteMovie = (id) => {
    setLoading(true);
    let docRef = firebase.firestore().collection("Movies").doc(id);
    docRef
      .delete()
      .then((doc) => {
        dispatch({ type: "DELETE_MOVIE", payload: id });
        setLoading(false);
        console.log("Movie Seccessfully Deleted!");
      })
      .catch((err) => {
        console.log("Error Removing Movie: ", err);
      });
  };

  return (
    <Card className={classes.root} variant='outlined'>
      {!loading ? (
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
          {/* <div style={{ border: "1px solid black" }}>
        <h3>Subscriptions Watched</h3>
        <ul>

        </ul>
      </div> */}
          <br />
          <CardActions>
            <Button component={Link} to={`/movies/movie/edit_movie/${movie.id}`}  variant="contained" color="primary" size='small' onClick={() => update(movie.id)}>
              Edit
            </Button>
            <Button variant="contained" color="primary" size='small' onClick={() => deleteMovie(movie.id)}>
              Delete
            </Button>
          </CardActions>
        </CardContent>
      ) : (
        <div className={classes2.root}>
          <LinearProgressWithLabel value={progress} />
        </div>
      )}
    </Card>
  );
};

export default MovieComp;
