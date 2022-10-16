import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <NavLink to='/' style={{padding: '10px'}}>Home</NavLink>
            <NavLink to='create-new-team' style={{padding: '10px'}}>Create a New Team</NavLink>
            <NavLink to='my-profile' style={{padding: '10px'}}>My Profile</NavLink>
        </div>
      
    )
}

export default Header