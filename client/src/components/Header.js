import React from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = ({setIsLoggedIn, isLoggedIn}) => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        navigate('/')
    }
    return (
        // <div>
        //     {isLoggedIn ? <NavLink to='/teams'>My Teams</NavLink> : <NavLink to='/' style={{padding: '10px'}}>Home</NavLink>}
        //     {isLoggedIn ? <NavLink to='create-new-team' style={{padding: '10px'}}>Create/Join a Team</NavLink> : null}
        //     {isLoggedIn ? <NavLink to='my-profile' style={{padding: '10px'}}>My Profile</NavLink> : null}
        //     {isLoggedIn ? <button onClick={logout}>logout</button> : <NavLink style={{padding: '10px'}} to='login'>Log In</NavLink>}
        // </div>
        <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Squad-Check</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/teams">My Teams</Nav.Link>
            <Nav.Link href="/create-new-team">Create or Join a Team</Nav.Link>
            <Nav.Link href="/my-profile">My Profile</Nav.Link>
            {isLoggedIn ? <Nav.Link onClick={logout}>logout</Nav.Link> : <Nav.Link href='login'>Log In</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
      </div>
      
    )
}

export default Header