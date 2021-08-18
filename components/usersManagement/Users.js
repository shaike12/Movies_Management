import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import LoadingBarComp from "../LoadingBar";
import UserComp from "./User";

const UsersComp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const usersStore = useSelector((state) => state.users);

  useEffect(() => {
    setLoading(true);

    function fetchData() {
      let allUsers = [];
      firebase
        .firestore()
        .collection("Users")
        .get()
        .then((data) => {
          data.forEach(async (doc) => {
            allUsers.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "ADD_ALL_USERS", payload: allUsers });
        });
    }
    fetchData();
    setLoading(false);
    // initilizeUsers()
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBarComp />
      ) : (
        <div>
          <h2>Users</h2>
          {usersStore.map((user, index) => (
            <UserComp key={index} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersComp;
