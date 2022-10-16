import React, { useState } from "react";

const NewTeamForm = () => {

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
        console.log(newTeamFormData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input placeholder="Team Name" name="name" onChange={handleChange}/>
            <select name="sport" onChange={handleChange}>
                <option>Select a Sport</option>
                <option>Hockey</option>
                <option>Baseball</option>
                <option>Basketball</option>
            </select>
            <select name="season" onChange={handleChange}>
                <option>Select the year your season will start</option>
                <option>{new Date().getFullYear()}</option>
                <option>{new Date().getFullYear() + 1}</option>
            </select>
            <input placeholder="League Name" name="league" onChange={handleChange}/>
            <input placeholder="Team Logo" name="logo" onChange={handleChange}/>
            <input placeholder="Team Description" name="description" onChange={handleChange}/>
            <input type='submit' />
            </form>
        </div>
    )
}

export default NewTeamForm