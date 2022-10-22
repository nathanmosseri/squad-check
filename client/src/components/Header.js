import React from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

const Header = ({setIsLoggedIn, isLoggedIn}) => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/')
    }
    return (
        <div>
            {isLoggedIn ? <NavLink to='/teams'>My Teams</NavLink> : <NavLink to='/' style={{padding: '10px'}}>Home</NavLink>}
            {isLoggedIn ? <NavLink to='create-new-team' style={{padding: '10px'}}>Create/Join a Team</NavLink> : null}
            {isLoggedIn ? <NavLink to='my-profile' style={{padding: '10px'}}>My Profile</NavLink> : null}
            {isLoggedIn ? <button onClick={logout}>logout</button> : <NavLink style={{padding: '10px'}} to='login'>Log In</NavLink>}
        </div>
      
    )
}

export default Header