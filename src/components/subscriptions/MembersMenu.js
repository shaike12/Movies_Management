import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import AddMemberComp from "./AddMember";
import MembersComp from "./Members";
import EditMemberComp from "./EditMember"

const MembersMenuComp = () => {
  let { url } = useRouteMatch();

  return (
    <div>
      <div>
        <button>
          <Link to='/subscriptions/all_members'>All Members</Link>
        </button>
        <button>
          <Link to='/subscriptions/add_member'>Add Member</Link>
        </button>
      </div>
      <div>
        <Switch>
          <Route exact path={ url + '/all_members'} component={MembersComp} />
          <Route path={ url + '/add_member'} component={AddMemberComp} />
          <Route path={ url + '/all_members/member/edit/:id'} component={EditMemberComp} />
        </Switch>
      </div>
    </div>
  );
};

export default MembersMenuComp;
