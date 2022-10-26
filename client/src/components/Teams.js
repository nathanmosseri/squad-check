import React from "react";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';


const Teams = ({userTeams, isLoggedIn}) => {

    const teams = userTeams.map((team) => {
       
        return (
        // <div key={team.id}>
        //     <Link to={`team/${team.id}`}>
        //     <img src={team.logo} style={{height: '50px'}}/>
        //     <h1 key={team.name}>{team.name}</h1>
        //     <h3>{team.sport}</h3>
        //     <h4 key={team.league}>{team.league}</h4>
        //     <h4 key={team.season}>{team.season}</h4>
        //     </Link>
        // </div>
        <Link to={`team/${team.id}`} key={uuidv4()}>
        <Card key={uuidv4()} style={{width: '50%', margin: '2%', justifyContent: 'center'}}>
        {/* <Card.Img variant="top" src={team.logo} style={{height: '200px'}} key={uuidv4()}/> */}
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
        </Card>
        </Link>
       )
    })


    return (
        <div>
            {isLoggedIn ? teams : <h1>please log in</h1>}
        </div>
    )
}

export default Teams