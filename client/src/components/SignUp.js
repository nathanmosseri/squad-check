import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = ({setUserData, setIsLoggedIn, signupData, setSignupData}) => {

    const navigate = useNavigate()

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(signupData)
        }).then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.user){
            console.log(data.user)
            console.log(data)
            setUserData(data.user)
            localStorage.setItem('token', data.token)
            setIsLoggedIn(true)
            navigate('/teams')
            } else {
                alert(data.errors)
            }
        })
    }

    return (
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input value={signupData.name} name="name" placeholder="name" onChange={handleChange}/>
            <input value={signupData.username} name='username' placeholder="username" onChange={handleChange}/>
            <input value={signupData.password} name="password" type='password' placeholder="password" onChange={handleChange}/>
            <input value={signupData.email} name="email" placeholder="email" onChange={handleChange}/>
            <input value={signupData.phone_number} name="phone_number" placeholder="phone number" onChange={handleChange}/>
            <input type='submit' />
        </form>
        <p>Have an account <Link to='/login'>Log In</Link></p>
        </div>
    )
}

export default SignUp