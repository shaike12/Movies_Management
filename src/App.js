import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import firebase from "./firebase";
import { Switch, Route, Link } from "react-router-dom";
import MoviesComp from "./components/movies/Movies";
import AppMenuComp from "./components/AppMenu";
import MainPageComp from "./components/MainPage";
import SubscripsionsComp from "./components/Subscripsions";
import UsersManagementComp from "./components/UsersManagement";
import MoviesMenuComp from "./components/movies/MoviesMenu";

function App() {
  useEffect(() => {
    // getAllMembers();
  }, []);

  // const getAllMembers = async () => {
  //   firebase
  //     .firestore()
  //     .collection("Users")
  //     .get()
  //     .then(async (data) => {
  //       if (data.docs.length === 0) {
  //       }
  //     });
  //   };

  return (
    <div className='App'>
      <AppMenuComp />
      <Switch>
        <Route path='/movies' component={MoviesMenuComp} />
        <Route path='/subscriptions' component={SubscripsionsComp} />
        <Route path='/users_management' component={UsersManagementComp} />
        {/* <Route path='/logout' component={} /> */}
      </Switch>
    </div>
  );
}

export default App;
