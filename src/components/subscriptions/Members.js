import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import MemberComp from "./Member";
import LoadingBarComp from "../LoadingBar";
import axios from 'axios'



const MembersComp = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const membersStore = useSelector((state) => state.members);

  useEffect(() => {
    async function fetchData() {
      await firebase
        .firestore()
        .collection("Members")
        .get()
        .then((data) => {
          let allMembers = [];

          data.forEach((doc) => {
            allMembers.push({ ...doc.data(), id: doc.id });
          });
          dispatch({ type: "ADD_ALL_MEMBERS", payload: allMembers });
        });
    }
    fetchData();
    setLoading(false);
    // initilizeMembers() 
  }, []);


//   const initilizeMembers = async () => {
//     setLoading(true);
//     let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
//     let members = resp.data.splice(0, 10);
//     dispatch({type: "INITILIZE_MEMBERS_INTO_FIREBASE", payload: members})
//     setLoading(false);
   
//   };

  return (
    <div>
      {loading ? (
          <LoadingBarComp/>
      ) : (
        <div>
          <h2>Subscriptions</h2>
          {membersStore.map((member) => (
            <MemberComp key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersComp;
