import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import LoadingBarComp from "../LoadingBar";
import firebase from "firebase";
import { Button } from "@material-ui/core";

const UserComp = ({user}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  // Delete Member From Firebase
  const deleteUser = async (id) => {
    setIsLoading(true);
    let docRef = await firebase.firestore().collection("Users").doc(id);
    docRef
      .delete()
      .then((doc) => {
        dispatch({ type: "DELETE_USER", payload: id });
        setIsLoading(false);
        console.log("User Seccessfully Deleted!");
      })
      .catch((err) => {
        console.log("Error Removing User: ", err);
      });
  };

  return (
    <div
      style={{
        border: "1px Solid black",
        maxWidth: "400px",
        marginBottom: "20px",
      }}
    >
      {isLoading ? (
        <LoadingBarComp />
      ) : (
        <>
          Name: {user.FirstName + " " + user.LastName}
          <br />
          Username: {user.Username}
          <br />
          Session Timeout:{" "}
          {user.SessionTimeout === -1
            ? "No Limit"
            : user.SessionTimeout}
          <br />
          Created Date: {user.CreatedDate.toString()}
          <br />
          Permissions: {user.Permissions.join(",")}
          <br />
          <Button
            component={Link}
            to={url + `/user/edit/${user.id}`}
            variant='contained'
            color='primary'
            size='small'
          >Edit</Button>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default UserComp;
