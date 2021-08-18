import React from 'react'
import { Link} from "react-router-dom";
const AppMenuComp = () => {
    return (
        <div>
            <menu>
                <button><Link to='/movies'>Movies</Link></button>
                <button><Link to='/subscriptions'>Subscriptions</Link></button>
                <button><Link to='/users_management'>Users Management</Link></button>
                <button><Link to='/logout'>Logout</Link></button>
            </menu>
            
        </div>
    )
}

export default AppMenuComp
