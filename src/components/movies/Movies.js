import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import MovieComp from "./Movie";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import LoadingBarComp from "../LoadingBar";





const MoviesComp = (props) => {
  const dispatch = useDispatch();
  const moviesStore = useSelector((state) => state.movies);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false)
        
    }
    fetchData();
  }, []);

 
  // const initilizeMovies = async () => {
  //   setIsLoading(true);
  //   let resp = await axios.get("https://api.tvmaze.com/shows")
  //   let tenFirstsMovies = resp.data.splice(0, 10);
  //   dispatch({type: "INITILIZE_MOVIES_INTO_FIREBASE", payload: tenFirstsMovies})
  //   setIsLoading(false);
   
  // };


  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleEditMovie = () => {};

  // Filtered Movies With Search User Input
    let filterdMovies= moviesStore.filter((movie) =>
     movie.Name.toLowerCase().includes(search)
    )  


  return (
    <Container>
      
        <div>
          <br />
          Find Movie: <input type='text' onChange={handleSearch} />
          <br />
          {isLoading ? (
            <LoadingBarComp/>
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
