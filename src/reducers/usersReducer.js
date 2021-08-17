import firebase from "firebase";

const users = (state = [], action) => {
  switch (action.type) {
    case "INITILIZE_MEMBERS_INTO_FIREBASE":
      action.payload.forEach((user) => {
        firebase
          .firestore()
          .collection("Users")
          .add({
            Name: user.name,
            Username: user.username,
            SessionTimeout: user.session_timeout,
            CreatedDate: user.created_date
          })
          .then((status) => {
            console.log("Initialize Users Into FireBase");
          });
      });
      return state;

    case "ADD_ALL_USERS":
      return action.payload;

    case "DELETE_USER":
      let updatedUsers = state.filter(
        (member) => member.id !== action.payload
      );
      return updatedUsers;

    case "UPDATE_USER":
      let users = state.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload.user;
        }
        return user;
      });
      return users;

    case "ADD_USER":
      let users2 = state;
      users2.push(action.payload);
      return users2;

    // case "GET_MEMBER_WATCHED_MOVIES":


    default:
      return state;
  }
};

export default users;
