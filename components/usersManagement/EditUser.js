import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const EditUserComp = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [permissions, setPermissions] = useState([
    { value: "View Subscriptions", isChecked: false },
    { value: "Create Subscriptions", isChecked: false },
    { value: "Delete Subscriptions", isChecked: false },
    { value: "Update Subscriptions", isChecked: false },
    { value: "View Movies", isChecked: false },
    { value: "Delete Movies", isChecked: false },
    { value: "Update Movies", isChecked: false },
    { value: "Create Movies", isChecked: false },
  ]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await firebase
        .firestore()
        .collection("Users")
        .doc(id)
        .get()
        .then((doc) => {
          setUser(doc.data());
          updateCheckBox(doc.data().Permissions);
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const updateCheckBox = (userPermissions) => {
    permissions.forEach((permission, index) => {
      if (userPermissions.includes(permission.value)) {
        permissions[index].isChecked = true;
      }
    });
  };

  const updateUser = async () => {
    let docRef = await firebase.firestore().collection("Users").doc(id);
    docRef
      .set(user)
      .then(() => {
        dispatch({ type: "UPDATE_USER", payload: { user, id } });
        console.log("Users Seccessfully Updated!");
        history.push("/users_management/all_users");
      })
      .catch((err) => {
        console.log("Error Updating User: ", err);
      });
  };

  const handleCheckChieldElement = (checkBoxId) => {
    let newPermissions = permissions;
    let currentCheckBox = newPermissions[checkBoxId];

    currentCheckBox.isChecked = !currentCheckBox.isChecked;

    if (
      currentCheckBox.value === "Create Subscriptions" ||
      currentCheckBox.value === "Update Subscriptions" ||
      currentCheckBox.value === "Delete Subscriptions"
    ) {
      newPermissions[0].isChecked = true;
    }
    if (
      currentCheckBox.value === "Create Movies" ||
      currentCheckBox.value === "Update Movies" ||
      currentCheckBox.value === "Delete Movies"
    ) {
      newPermissions[4].isChecked = true;
    }

    setPermissions([...newPermissions]);

    // Getting All Permissions That isChecked are True
    // And Getting Only The Values
    let newUserPermissions = newPermissions.filter(
      (permission) => permission.isChecked
    );
    let newUserPermissionsValues = newUserPermissions.map((permission) => permission.value);
    
    // Set The User's New Permissions 
    setUser({ ...user, Permissions: newUserPermissionsValues });
    
  };

  return (
    <div>
      <form>
        First Name:{" "}
        <input
          type='text'
          value={user.FirstName}
          onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
        />
        <br />
        Last Name:{" "}
        <input
          type='text'
          value={user.LastName}
          onChange={(e) => setUser({ ...user, LastName: e.target.value })}
        />
        <br />
        Username:{" "}
        <input
          type='text'
          value={user.Username}
          onChange={(e) => setUser({ ...user, Username: e.target.value })}
        />
        <br />
        Session Timeout (Minutes):{" "}
        <input
          type='text'
          value={user.SessionTimeout}
          onChange={(e) => setUser({ ...user, SessionTimeout: e.target.value })}
        />
        <br />
        Created Date:{" "}
        {user.CreatedDate}
        <br />
        Permissions: <br />
        {permissions.map((permission, index) => {
          return (
            <div>
              <input
                type='checkbox'
                name={permission.value}
                disabled={loading}
                checked={permissions[index].isChecked}
                value={permission.value}
                onChange={() => handleCheckChieldElement(index)}
              />
              <label htmlFor={permission.value}>{permission.value}</label>
              <br />
            </div>
          );
        })}
        <Button disabled={loading} onClick={updateUser}>
          Update
        </Button>
        <Button onClick={() => history.push("/users_management/all_users")}>
          Cancel
        </Button>
        <br />
      </form>
    </div>
  );
};

export default EditUserComp;
