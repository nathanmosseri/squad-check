import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewGameForm from "./NewGameForm";

const TeamDetails = ({gameCreated, setGameCreated}) => {

const {id} = useParams()

const [userTeams, setUserTeams] = useState([])
const [teamGames, setTeamGames] = useState([])
const [teamRoster, setTeamRoster] = useState([])
const [playerStats, setPlayerStats] = useState([])
const [keys, setKeys] = useState([])
const [isAdmin, setIsAdmin] = useState([])

    const getTeamDetails = () => {
        let token = localStorage.getItem('token')
        fetch(`http://localhost:3000/teams/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then(res => res.json())
        .then((data) => {
            console.log(data.team.games)
            setIsAdmin(data.is_admin)
            setUserTeams(data.team)
            setTeamGames(data.team.games)
            setTeamRoster(data.team.users)
            if(data.team.hockey_stats.length <= 0 && data.team.baseball_stats.length <= 0){
                setPlayerStats(data.team.basketball_stats)
                setKeys(data.team.basketball_stats[0])
            } else if (data.team.basketball_stats.length <= 0 && data.baseball_stats.length <= 0){
                setPlayerStats(data.team.hockey_stats)
                setKeys(data.team.hockey_stats[0])
            } else if (data.team.hockey_stats.length <= 0 && data.team.basketball_stats.length <= 0){
                setPlayerStats(data.team.baseball_stats)
                setKeys(data.team.baseball_stats[0])
            }
        })
    }

    useEffect(() => {
        getTeamDetails()
    }, [gameCreated])

    const attendance = (users) => {
        const thing = users.map((user) => {
            if(user.attending === null){
                return <li>{user.name} is undecided</li>
            } else if(user.attending === true) {
                return <li>{user.name} is coming</li>
            } else {
                return <li>{user.name} is not coming</li>
            }
        })
        return thing
    }

    const games = teamGames.map((game, i) => {
        return (
        <div key={game.id + 3000}>
        <h4 key={game.datetime}>{game.datetime}</h4>
        <h4 key={game.opponent}>{game.opponent}</h4>
        <h4 key={game.id}>{game.home ? '@Home' : `@${game.opponent}`}</h4>
        <h4 key={game.location}>{game.location}</h4>
        <h3 key={i - 3000}>{game.points_for} - {game.points_against}</h3>
        <button>In</button>
        <button>Out</button>
        <ul>
        {attendance(game.attendings)}
        </ul>
        </div>
        )
    })

    const roster = teamRoster.map((member) => {
        return <li key={member.id}>{member.name}</li>
    })
    
    const statsHeaders = Object.keys(keys).map((key, i) => {
        return (
        <th key={i}>{key.split('_').join(' ')}</th>
        )
    })

        const statData = playerStats.map((stat) => {
             const tableData = Object.values(stat).map((value, i) => {
               return (
                    <td>{value}</td>
                
                )
            })
            return (
                <tbody>
                <tr>
                    {tableData}
                </tr>
                </tbody>
            )
        })

    return (
        <div>
            <Link to='/teams'>Back</Link>
            <div>
                <img src={userTeams.logo} style={{height: '50px'}}/>
                <h1>{userTeams.name}</h1>
                <h4>{userTeams.league}</h4>
                <h4>{userTeams.season}</h4>
                <h4>{userTeams.description}</h4>
                {isAdmin? <h4>Join Code: {userTeams.uid}</h4> : null}
                <h4>Record: {userTeams.wins} - {userTeams.loses} - {userTeams.ties}</h4>
            </div>
            <div>
                {isAdmin ? <NewGameForm setGameCreated={setGameCreated}/> : null}
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
                    <thead>
                    <tr>
                        {statsHeaders}       
                    </tr>
                    </thead>
                    {/* <tr> */}
                    {statData}
                    {/* </tr> */}
                </table>
            </div>
        </div>
    )
}

export default TeamDetails