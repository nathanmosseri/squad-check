import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(signupData)
        }).then((res) => res.json())
        .then((data) => {
            if(data.user){
            setUserData(data.user)
            localStorage.setItem('token', data.token)
            setIsLoggedIn(true)
            navigate('/teams')
            setSignupData({
                username: '',
                password: '',
                name: '',
                email: '',
                phone_number: ''
            })
            } else {
                alert(data.errors)
            }
        })
    }

    return (
        <div style={{margin: '2%'}}>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={signupData.username} name='username' placeholder="Create a Username" onChange={handleChange}/>
                </Form.Group >
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={signupData.name} name="name" placeholder="Enter your Full Name" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={signupData.password} name="password" type='password' onChange={handleChange} placeholder="Create a Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={signupData.email} name="email" onChange={handleChange} />
                    <Form.Text className="text-muted">
                    Your email address / phone number will be used to remind you to check in for upcoming games
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control value={signupData.phone_number} name="phone_number" placeholder="Enter your Phone Number" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>Have an account <Link to='/login'>Log In</Link></p>
        </div>
    )
}

export default SignUp