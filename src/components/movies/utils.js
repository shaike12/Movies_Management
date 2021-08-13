import firebase from "firebase"

const getAllMovies = () => {
    firebase
      .firestore()
      .collection("Movies")
      .get()
      .then((data) => {
        let allMovies = [];
        data.forEach((doc) => {
          allMovies.push({...doc.data(), id: doc.id});
        });
        return allMovies;
      });
}


 export default {getAllMovies}