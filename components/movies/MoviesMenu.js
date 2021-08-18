import React from 'react'
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AddMovieComp from './AddMovie';
import EditMovieComp from './EditMovie';
import MoviesComp from './Movies';

const MoviesMenuComp = (props) => {
    
    let {path, url} = useRouteMatch()

    return (
        <div>
        <div>
            <button><Link to='/movies/all_movies'>All Movies</Link></button>
            <button> <Link to='/movies/add_movie'>Add Movie</Link></button>
        
        </div>
        <div>
      <Switch>
          <Route path={url + "/all_movies"} component={MoviesComp} />
          <Route path={url + "/add_movie"} component={AddMovieComp} />
          <Route path={url + "/movie/edit/:id"} component={EditMovieComp} />
      </Switch>
      </div>
      </div>
    )
}

export default MoviesMenuComp
