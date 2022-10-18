import React from "react";
import { Link } from "react-router-dom";

const Teams = ({userTeams, isLoggedIn}) => {

    const teams = userTeams.map((team) => {
       return (
        <div key={team.id}>
            <Link to={`team/${team.id}`}>
            <img src={team.logo} style={{height: '50px'}}/>
            <h1 key={team.name}>{team.name}</h1>
            <h3>{team.sport}</h3>
            <h4 key={team.league}>{team.league}</h4>
            <h4 key={team.season}>{team.season}</h4>
            </Link>
        </div>
       )
    })


    return (
        <div>
            {isLoggedIn ? teams : <h1>please log in</h1>}
        </div>
    )
}

export default Teams