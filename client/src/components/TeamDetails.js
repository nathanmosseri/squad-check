import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const TeamDetails = () => {

const {id} = useParams()

const [userTeams, setUserTeams] = useState([])
const [teamGames, setTeamGames] = useState([])
const [teamRoster, setTeamRoster] = useState([])
const [playerStats, setPlayerStats] = useState([])

    const getTeamDetails = () => {
        fetch(`http://localhost:3000/teams/${id}`).then(res => res.json())
        .then((data) => {
            setUserTeams(data)
            setTeamGames(data.games)
            setTeamRoster(data.users)
            setPlayerStats(data.hockey_stats)
        })
    }

    useEffect(() => {
        getTeamDetails()
    }, [])


    const games = teamGames.map((game, i) => {
        return (
        <div key={game.id + 3000}>
        <h4 key={game.datetime}>{game.datetime}</h4>
        <h4 key={game.opponent}>{game.opponent}</h4>
        <h4 key={game.id}>{game.home ? '@Home' : `@${game.opponent}`}</h4>
        <h4 key={game.location}>{game.location}</h4>
        <h3 key={i - 3000}>{game.result}</h3>
        </div>
        )
    })

    const roster = teamRoster.map((member) => {
        return <li key={member.id}>{member.name}</li>
    })

    const individualStats = playerStats.map((stat) => {
        return (
            <tr key={stat.id}>
                <td key={stat.name}>{stat.name}</td>
                <td key={stat.games_played}>{stat.games_played}</td>
                <td>{stat.goals}</td>
                <td>{stat.assists}</td>
                <td>{stat.penalty_minutes}</td>
                <td>{stat.plus_minus}</td>
                <td>{stat.saves}</td>
                <td>{stat.goals_allowed}</td>
                <td>{stat.save_precentage}</td>
            </tr>
        )
    })
    
    return (
        <div>
            <Link to='/'>Back</Link>
            <div>
                <img src={userTeams.logo} style={{height: '50px'}}/>
                <h1>{userTeams.name}</h1>
                <h4>{userTeams.league}</h4>
                <h4>{userTeams.season}</h4>
                <h4>{userTeams.description}</h4>
                <h4>Record: {userTeams.wins} - {userTeams.loses} - {userTeams.ties}</h4>
            </div>
            <div>
                <h2>Schedule:</h2>
                {games}
            </div>
            <div>
                <ul>
                    <h2>Roster</h2>
                    {roster}
                </ul>
            </div>
            <div>
                <table>
                    <tr>
                        <th>Player</th>
                        <th>Games Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Penalty Minutes</th>
                        <th>+/-</th>
                        <th>Saves</th>
                        <th>Goals Allowed</th>
                        <th>Save %</th>
                    </tr>
                    {individualStats}
                </table>
            </div>
        </div>
    )
}

export default TeamDetails