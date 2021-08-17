import firebase from "firebase";

const members = (state = [], action) => {
  switch (action.type) {
    case "INITILIZE_MEMBERS_INTO_FIREBASE":
      action.payload.forEach((member) => {
        firebase
          .firestore()
          .collection("Members")
          .add({
            Name: member.name,
            Email: member.email,
            City: member.address.city,
          })
          .then((status) => {
            console.log("Initialize Members Into FireBase");
          });
      });
      return state;

    case "ADD_ALL_MEMBERS":
      return action.payload;

    case "DELETE_MEMBER":
      let updatedMembers = state.filter(
        (member) => member.id !== action.payload
      );
      return updatedMembers;

    case "UPDATE_MEMBER":
      let members = state.map((member) => {
        if (member.id === action.payload.id) {
          return action.payload.member;
        }
        return member;
      });
      return members;

    case "ADD_MEMBER":
      let members2 = state;
      members2.push(action.payload);
      return members2;

    // case "GET_MEMBER_WATCHED_MOVIES":


    default:
      return state;
  }
};

export default members;
