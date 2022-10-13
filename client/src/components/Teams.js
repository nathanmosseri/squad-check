import React from "react";
import { Link } from "react-router-dom";

const Teams = ({userTeams}) => {

    console.log(userTeams)

    const teams = userTeams.map((team) => {
       return (
        <div key={team.id}>
            <Link to={`team/${team.id}`}>
            <img src={team.logo} style={{height: '50px'}}/>
            <h1 key={team.name}>{team.name}</h1>
            <h4 key={team.league}>{team.league}</h4>
            </Link>
        </div>
       )
    })


    return (
        <div>
            {teams}
        </div>
    )
}

export default Teams