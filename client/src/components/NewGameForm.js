import React, { useState } from "react";
import { useParams } from "react-router-dom";

const NewGameForm = ({setGameCreated}) => {

    const {id} = useParams()

    const [gameFormData, setGameFormData] = useState({
        team_id: id,
        opponent: "",
        datetime: "",
        location: "",
        home: false,
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
        fetch('http://localhost:3000/games', {
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
            }
        })
    }

    return (
        <>
            <h3>Schedule a new game</h3>
            <form onSubmit={handleSubmit}>
                <label>Date and Time</label>
                <input name="datetime" type='datetime-local' onChange={handleChange}/>
                <select name="home" onChange={handleChange}>
                    <option value={null}>Home or Away?</option>
                    <option value={true}>Home</option>
                    <option value={false}>Away</option>
                </select>
                <label>Location</label>
                <input name="location" onChange={handleChange}/>
                <label>opponent</label>
                <input name="opponent" onChange={handleChange}/>
                <input type='submit' />
            </form>
        </>
    )
}

export default NewGameForm