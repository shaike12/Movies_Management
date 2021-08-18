import React from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddUserComp from './AddUser';
import EditUserComp from './EditUser';
import UsersComp from './Users';

const UsersManagementMenuComp = () => {

    let { url } = useRouteMatch();

    
    return (
        <div>
      <div>
        <button>
          <Link to={ url + '/all_users'}>All Users</Link>
        </button>
        <button>
          <Link to={ url + '/add_user'}>Add User</Link>
        </button>
      </div>
      <div>
        <Switch>
          <Route exact path={ url + '/all_users'} component={UsersComp} />
          <Route path={ url + '/add_user'} component={AddUserComp} />
          <Route path={ url + '/all_users/user/edit/:id'} component={EditUserComp} />
        </Switch>
      </div>
    </div>
    )
}

export default UsersManagementMenuComp
