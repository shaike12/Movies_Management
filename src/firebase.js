import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDfVgBHhyUVnnefEnz9n6VweapGP3Su-kk",
  authDomain: "moviesmanagment.firebaseapp.com",
  databaseURL: "https://moviesmanagment-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moviesmanagment",
  storageBucket: "moviesmanagment.appspot.com",
  messagingSenderId: "504452227420",
  appId: "1:504452227420:web:eb5a91ea2f19c80bbfe199"
};

firebase.initializeApp(firebaseConfig)

export default firebase

