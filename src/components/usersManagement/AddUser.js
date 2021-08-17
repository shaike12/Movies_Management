import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const AddUserComp = () => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    SessionTimeout: 0,
    Permissions: [],
  });
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

  const addUser = async () => {
    let docRef = await firebase.firestore().collection("Users");
    docRef
      .add(user)
      .then(() => {
        dispatch({ type: "ADD_USER", payload: user });
        console.log("User Seccessfully Added!");
        history.push("/users_management/all_users");
      })
      .catch((err) => {
        console.log("Error Adding User: ", err);
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
    setUser({ ...user, Permissions: newUserPermissionsValues});
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
        Session Timeout:{" "}
        <input
          type='text'
          value={user.SessionTimeout}
          onChange={(e) => setUser({ ...user, SessionTimeout: e.target.value })}
        />
        <br />
        Permissions:{" "}
        {permissions.map((permission, index) => {
          return (
            <div key={index}>
              <input
                type='checkbox'
                name={permission.value}
                checked={permission.isChecked}
                value={permission.value}
                onChange={() => handleCheckChieldElement(index)}
              />
              <label htmlFor={permission.value}>{permission.value}</label>
            </div>
          );
        })}
        <br />
        <Button onClick={addUser}>Save</Button>
        <Button onClick={() => history.push("/users_management/all_users")}>
          Cancel
        </Button>
        <br />
      </form>
    </div>
  );
};

export default AddUserComp;

{
  /* <div>
            <input
              type='checkbox'
              name="Create Movies"
              value="Create Movies"
              onChange={(e) =>
                setUser({ ...user, Permissions: [...user.Permissions, e.target.value] })
              }
            />
            <label htmlFor="Create Movies">Create Movies</label>

            </div> */
}
