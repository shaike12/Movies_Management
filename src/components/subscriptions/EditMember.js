import { Button, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";

const EditMemberComp = () => {
  const [member, setMember] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    async function fetchData(){
    await firebase
      .firestore()
      .collection("Members")
      .doc(id)
      .get()
      .then((doc) => {
          setMember(doc.data());
        
      });
    }
    fetchData()

  }, []);

  const update = async () => {
      let docRef = await firebase.firestore().collection("Members").doc(id);
      docRef
      .set(member)
      .then(() => {
          dispatch({ type: "UPDATE_MEMBER", payload: { member, id } });
            console.log("Members Seccessfully Updated!");
            history.push('/subscriptions/all_members')
      })
      .catch((err) => {
        console.log("Error Updating Member: ", err);
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
        /><br/>
        Email:{" "}
        <input
          type='text'
          value={member.Email}
          onChange={(e) => setMember({ ...member, Email: e.target.value })}
        /><br/>
        City:{" "}
        <input
          type='text'
          value={member.City}
          onChange={(e) => setMember({ ...member, City: e.target.value })}
        /><br/>
        
        <Button onClick={update}>Update</Button>
        <Button onClick={() => history.push("/subscriptions/all_members")}>Cancel</Button>
      </form>
    </div>
  );
};

export default EditMemberComp;
