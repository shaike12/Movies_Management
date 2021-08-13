import React from 'react'
import { Link, Switch, Route } from "react-router-dom";
import MoviesComp from './movies/Movies';
const AppMenuComp = () => {
    return (
        <div>
            <menu>
                <button><Link to='/movies'>Movies</Link></button>
                <button><Link to='/subscriptions'>Subscriptions</Link></button>
                <button><Link to='/users_management'>Users Management</Link></button>
                <button><Link to='/logout'>Logout</Link></button>
            </menu>
            <Switch>
                <Route path="/all_movies" component={MoviesComp} />
            </Switch>
        </div>
    )
}

export default AppMenuComp
