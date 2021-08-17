import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import LoadingBarComp from "../LoadingBar";
import MoviesWatchedComp from "./MoviesWatched";

const MemberComp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const moviesStore = useSelector((state) => state.movies);
  const { url } = useRouteMatch();
  const [watchedMovies, setWatchedMovies] = useState([]);


    useEffect(() => {
        // getAllSubscriptions()
        
    }, [])

//    const getAllSubscriptions = async () => {
//       await firebase
//               .firestore()
//               .collection("Subscriptions")
//               .get()
//               .then((subscriptions) => {
//                 subscriptions.forEach((subscription) => {
//                   if (subscription.data().MemberId === props.member.id) {
//                     setWatchedMovies(subscription.data().Movies);
//                   }
//                 });
//               });
//   }


  // Delete Member From Firebase
  const deleteMember = async (id) => {
    setIsLoading(true);
    let docRef = await firebase.firestore().collection("Members").doc(id);
    docRef
      .delete()
      .then((doc) => {
        dispatch({ type: "DELETE_MEMBER", payload: id });
        setIsLoading(false);
        console.log("Member Seccessfully Deleted!");
      })
      .catch((err) => {
        console.log("Error Removing Member: ", err);
      });
  };

  return (
    <div style={{border: "1px Solid black", maxWidth: '400px', marginBottom: "20px"}}>
      {isLoading ? (
        <LoadingBarComp />
      ) : (
        <>
          <h2>{props.member.Name}</h2>
          Email: {props.member.Email}
          <br />
          City: {props.member.City}
          <br />
          <Button>
            <Link to={url + `/member/edit/${props.member.id}`}>Edit</Link>
          </Button>
          <Button onClick={() => deleteMember(props.member.id)}>Delete</Button>
          <MoviesWatchedComp watchedMovies={watchedMovies} />
        </>
      )}
    </div>
  );
};

export default MemberComp;
