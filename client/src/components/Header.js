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
        <div>
        <Navbar bg="dark" variant="dark">
        <Container >
          <Navbar.Brand href="/" className="navbar-headers">Squad-Check</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/teams" ><div className="navbar-headers-teams">My Teams</div></Nav.Link>
            <Nav.Link href="/create-new-team" ><div className="navbar-headers">Create or Join a Team</div></Nav.Link>
            <Nav.Link href="/my-profile"><div className="navbar-headers">My Profile</div></Nav.Link>
            {isLoggedIn ? <Nav.Link onClick={logout} ><div className="navbar-headers">logout</div></Nav.Link> : <Nav.Link href='login'>Log In</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
      </div>
      
    )
}

export default Header