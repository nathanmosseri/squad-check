import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn, loginData, setLoginData, userData, setUserData}) => {

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
            console.log(data.user)
            console.log(data)
            setUserData(data.user)
            localStorage.setItem('token', data.token)
            setIsLoggedIn(true)
            navigate('/teams')
            } else {
                alert(data.error)
            }
        })
    }

    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if(token && !userData.username){
    //         fetch('http://localhost:3000/me', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         }).then(res => res.json())
    //         .then((data) => {
    //             if(data.userData){
    //                 setUserData(data.user)
    //                 setUserData(data)
    //                 // setUserTeams(data.teams)
    //                 // setUserHockeyStats(data.hockey_stats)
    //                 // setUserBaseballStats(data.baseball_stats)
    //                 // setUserBasketballStats(data.basketball_stats)
    //             }
    //         })
    //     }
    // })

    // const logout = () => {
    //     localStorage.removeItem('token')
    // }


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