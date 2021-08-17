import "./App.css";
import { Switch, Route} from "react-router-dom";
import AppMenuComp from "./components/AppMenu";
import MoviesMenuComp from "./components/movies/MoviesMenu";
import MembersMenuComp from "./components/subscriptions/MembersMenu";
import UsersManagementMenuComp from "./components/usersManagement/UsersManagementMenu";

function App() {
  return (
    <div className='App'>
      <AppMenuComp />
      <Switch>
        <Route path='/movies' component={MoviesMenuComp} />
        <Route path='/subscriptions' component={MembersMenuComp} />
        <Route path='/users_management' component={UsersManagementMenuComp}/>
      </Switch>
    </div>
  );
}

export default App;
