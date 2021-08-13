import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase";
import MovieComp from "./Movie";
import { Link, Route, Switch } from "react-router-dom";
import MoviesMenuComp from "./MoviesMenu";
import utils from "./utils";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Button, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

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

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "80px auto",
  },
});

const MoviesComp = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const moviesStore = useSelector((state) => state.movies);
  const [progress, setProgress] = React.useState(10);
  // const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await firebase
        .firestore()
        .collection("Movies")
        .get()
        .then((data) => {
          let allMovies = [];

          data.forEach((doc) => {
            allMovies.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "ADD_ALL_MOVIES", payload: allMovies });
        });
    }
    fetchData();
    setLoading(false)
  }, []);

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

  // const initilizeMovies = async () => {
  //   setLoading(true);
  //   let resp = await axios.get("https://api.tvmaze.com/shows")
  //   let tenFirstsMovies = resp.data.splice(0, 10);
  //   dispatch({type: "INITILIZE_MOVIES_INTO_FIREBASE", payload: tenFirstsMovies})
  //   setLoading(false);
   
  // };


  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleEditMovie = () => {};

  // Filtered Movies With Search User Input
  let filterdMovies = moviesStore.filter((movie) =>
    movie.Name.toLowerCase().includes(search)
  );

  
  return (
    <Container>
      
        <div>
          <br />
          Find Movie: <input type='text' onChange={handleSearch} />
          <br />
          {loading ? (
            <div className={classes.root}>
              <LinearProgressWithLabel value={progress} />
            </div>
          ) : (
            filterdMovies.map((movie, index) => {
              return (
                <MovieComp key={index} movie={movie} update={handleEditMovie} />
              );
            })
          )}
        </div>
     
    </Container>
  );
};

export default MoviesComp;
