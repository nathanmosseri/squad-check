import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewGameForm = ({setGameCreated}) => {

    const {id} = useParams()

    const [gameFormData, setGameFormData] = useState({
        team_id: id,
        opponent: "",
        datetime: "",
        location: "",
        home: undefined,
        points_for: 0,
        points_against: 0
    })

    const handleChange = (e) => {
        setGameFormData({
            ...gameFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        let token = localStorage.getItem('token')
        e.preventDefault()
        fetch('https://squad-check.onrender.com/api/games', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(gameFormData)
        }).then(res => res.json())
        .then((data) => {
            if(data.errors){
                alert(data.errors)
            } else {
                setGameCreated(prev => !prev)
                setGameFormData({
                    team_id: id,
                    opponent: "",
                    datetime: "",
                    location: "",
                    home: false,
                    points_for: 0,
                    points_against: 0
                })
            }
        })
    }

    return (
        <>
            <h3>Schedule a new game</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Date and Time</Form.Label>
                    <Form.Control name="datetime" type='datetime-local' onChange={handleChange} value={gameFormData.datetime}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control name="location" onChange={handleChange} value={gameFormData.location}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Home or Away?</Form.Label>
                    <Form.Select name="home" onChange={handleChange} value={gameFormData.home}>
                        <option value={undefined}>---</option>
                        <option value={true}>Home</option>
                        <option value={false}>Away</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Opponent</Form.Label>
                    <Form.Control name="opponent" onChange={handleChange} value={gameFormData.opponent}/>
                </Form.Group>
                <Button variant="light" type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default NewGameForm