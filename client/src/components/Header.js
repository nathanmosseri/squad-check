import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='my-profile'>My Profile</NavLink>
        </div>
      
    )
}

export default Header