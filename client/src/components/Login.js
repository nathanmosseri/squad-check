import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        fetch('https://squad-check.onrender.com/api/login', {
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
        <div style={{margin: '2%'}}>
        <h1>Log In</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control value={loginData.username} name="username" placeholder="Enter Username" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={loginData.password} name="password" type="password" placeholder="Password" onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        <p>Not a member? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}

export default Login