import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewTeamForm = ({isLoggedIn, setNewTeamSubmitted, setTeamJoined}) => {

    const navigate = useNavigate()

    const [joinTeamCode, setJoinTeamCode] = useState({uid: ''})
    const [newTeamFormData, setNewTeamFormData] = useState({
        name: '',
        sport: '',
        season: '',
        league: '',
        logo: '',
        description: '',
        wins: 0,
        loses: 0,
        ties: 0,
        overtime_loses: 0
    })

    const handleChange = (e) => {
        setNewTeamFormData({
            ...newTeamFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        fetch('http://localhost:3000/teams', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newTeamFormData)
        }).then(res => res.json())
        .then((data) => {
            if(data.errors){
                alert(data.errors)
            } else {
                setNewTeamSubmitted(prev => !prev)
                navigate(`/teams/team/${data.id}`)
            }
        })
    }

    const handleJoinChange = (e) => {
        setJoinTeamCode({
            ...joinTeamCode,
            [e.target.name]: e.target.value
        })
    }

    const handleJoinSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        fetch('http://localhost:3000/memberships', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(joinTeamCode)
        }).then(res => res.json())
        .then((data) => {
            if(data.error){
                alert(data.error)
            } else {
                setTeamJoined(prev => !prev)
                navigate(`/teams/team/${data.team_id}`)
            }
        })
    }

    return (
        <div style={{backgroundColor: 'rgb(80, 77, 77)', height: '100vh'}}>
            {isLoggedIn ? (
            <div style={{padding: '1%'}}>
                <h1>Create a New Team</h1>
                <Form onSubmit={handleSubmit} >
                    <Form.Group>
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control value={newTeamFormData.name} placeholder="Team Name" name="name" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport</Form.Label>
                        <Form.Select value={newTeamFormData.sport} name="sport" onChange={handleChange}>
                            <option>Select a Sport</option>
                            <option>Hockey</option>
                            <option>Baseball</option>
                            <option>Basketball</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Season</Form.Label>
                        <Form.Select value={newTeamFormData.season} name="season" onChange={handleChange}>
                            <option>Select the year your season will start</option>
                            <option>{new Date().getFullYear()}</option>
                            <option>{new Date().getFullYear() + 1}</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>League</Form.Label>
                        <Form.Control value={newTeamFormData.league} placeholder="League Name" name="league" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Team Logo</Form.Label>
                        <Form.Control value={newTeamFormData.logo} placeholder="Team Logo (URL)" name="logo" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Team Description</Form.Label>
                        <Form.Control value={newTeamFormData.description} placeholder="Team Description" name="description" onChange={handleChange}/>
                    </Form.Group>  
                    <Button type='submit'>Create</Button>
                </Form>
                <h1>Join an Existing Team</h1>
                <Form onSubmit={handleJoinSubmit}>
                    <Form.Group>
                        <Form.Label>Enter the "Join Code" of the team you'd like to join</Form.Label>
                        <Form.Control value={joinTeamCode.uid} name='uid' onChange={handleJoinChange}/>
                    </Form.Group>
                    <Button type="submit">Join</Button>
                </Form>
            </div>
            
            )
            :
            <h1>please log in</h1>
            }
        </div>
    )
}

export default NewTeamForm