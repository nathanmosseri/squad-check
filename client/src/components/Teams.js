import React from "react";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';


const Teams = ({userTeams, isLoggedIn}) => {

    const teams = userTeams.map((team) => {
       
        return (
            <Card key={uuidv4()} style={{width: '50%', margin: '2%', left: '20%'}}>
            <Link to={`team/${team.id}`} key={uuidv4()} style={{textDecoration: 'none', color: 'black'}}>
        <Card.Body key={uuidv4()}>
            <Card.Img src={team.logo} key={uuidv4()} style={{height: '12%', width: '12%', float: 'right'}} />
            <Card.Title key={uuidv4()}>{team.name}</Card.Title>
            <Card.Text key={uuidv4()}>{team.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" key={uuidv4()}>
            <ListGroup.Item key={uuidv4()}>{team.season}</ListGroup.Item>
            <ListGroup.Item key={uuidv4()}>{team.sport}</ListGroup.Item>
            <ListGroup.Item key={uuidv4()}>{team.league}</ListGroup.Item>
        </ListGroup>
        </Link>
        </Card>
       )
    })


    return (
        <div className="teams-page-div">
            {isLoggedIn ? teams : 
            <div style={{backgroundColor: 'darkgray', textAlign: 'center'}}>
                <h1>Please log in or sign up to see your teams</h1>
            </div>
            }
        </div>
    )
}

export default Teams