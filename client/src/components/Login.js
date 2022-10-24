import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn, loginData, setLoginData, userData, setUserData, setUserTeams, setUserHockeyStats, setUserBaseballStats, setUserBasketballStats}) => {

    const navigate = useNavigate()

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }).then((res) => res.json())
           .then((data) => {
            if(data.user){
            setUserData(data)
            localStorage.setItem('token', data.token)
            setIsLoggedIn(true)
            navigate('/teams')
            setLoginData({
                username: '',
                password: ''
            })
            } else {
                alert(data.error)
            }
        })
    }


    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input value={loginData.username} name="username" placeholder="username" onChange={handleChange}/>
                <input value={loginData.password} name="password" placeholder="password" type='password' onChange={handleChange}/>
                <input type='submit' />
            </form>
            <p>Not a memeber? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}

export default Login