import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import LoadingBarComp from "../LoadingBar";

const MemberComp = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { url } = useRouteMatch()

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
    <div>
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
        </>
      )}
    </div>
  );
};

export default MemberComp;
