import { Button } from "@material-ui/core";
import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const AddMemberComp = () => {
  const [member, setMember] = useState({
    Name: "",
    Email: "",
    City: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const addMember = async () => {
    let docRef = await firebase.firestore().collection("Members");
    docRef
      .add(member)
      .then(() => {
        dispatch({ type: "ADD_MEMBER", payload: member });
        console.log("MEMBER Seccessfully Added!");
        history.push("/subscriptions/all_members");
      })
      .catch((err) => {
        console.log("Error Adding Member: ", err);
      });
  };

  return (
    <div>
      <form>
        Name:{" "}
        <input
          type='text'
          value={member.Name}
          onChange={(e) => setMember({ ...member, Name: e.target.value })}
        />
        <br />
        Email:{" "}
        <input
          type='text'
          value={member.Email}
          onChange={(e) => setMember({ ...member, Email: e.target.value })}
        />
        <br />
        City:{" "}
        <input
          type='text'
          value={member.City}
          onChange={(e) => setMember({ ...member, City: e.target.value })}
        />
        <br />
      
        <Button onClick={addMember}>Save</Button>
        <Button onClick={() => history.push("/subscriptions/all_members")}>
          Cancel
        </Button><br/>
        
      </form>
    </div>
  );
};

export default AddMemberComp;
