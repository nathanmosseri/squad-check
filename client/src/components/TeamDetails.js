import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import UpdateStatsForm from "./UpdateStatsForm";

const TeamDetails = ({gameCreated, setGameCreated, teamRoster, setTeamRoster}) => {

const {id} = useParams()

const navigate = useNavigate()

const [userTeams, setUserTeams] = useState([])
const [teamGames, setTeamGames] = useState([])
const [playerStats, setPlayerStats] = useState([])
const [teamSport, setTeamSport] = useState([])
const [keys, setKeys] = useState([])
const [isAdmin, setIsAdmin] = useState([])
const [attendanceClick, setAttendanceClick] = useState(false)
const [statsButtonClicked, setStatsButtonClicked] = useState(false)

    const getTeamDetails = () => {
        let token = localStorage.getItem('token')
        fetch(`http://localhost:3000/teams/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
        }).then(res => res.json())
        .then((data) => {
            setTeamSport(data.team.sport)
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
    }, [gameCreated, attendanceClick])

    const attendance = (users) => {
        let undecided = []
        let coming = []
        let notComing = []
        
        users.forEach((user) => {
            if(user.attending === null){
                undecided.push(user.name)
            } else if(user.attending === true) {
                coming.push(user.name)
            } else {
                notComing.push(user.name)
            }
        })

        return (
            <div>
                <p>In:</p>
                <ul>
                    {coming.map((user) => <li key={user}>{user}</li>)}
                </ul>
                <p>Out:</p>
                <ul>
                    {notComing.map((user) => <li key={user}>{user}</li>)}
                </ul>
                <p>Undecided:</p>
                <ul>
                    {undecided.map((user) => <li key={user}>{user}</li>)}
                </ul>
            </div>

        )
    }

    const handleClick = (e, id) => {
        let token = localStorage.getItem('token')
        fetch(`http://localhost:3000/attendings/game/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify({attending: e.target.value})
        }).then(res => res.json())
        .then((data) => {
            console.log(data)
            setAttendanceClick(prev => !prev)
        })
    }
    
    const upcomingGames = teamGames.map((game, i) => {
        if(game['past?'] === false){
        return (
        <div key={game.id + 3000}>
        <h4 key={game.datetime}>{game.datetime}</h4>
        <h4 key={game.opponent}>{game.opponent}</h4>
        <h4 key={game.id}>{game.home ? '@Home' : `@${game.opponent}`}</h4>
        <h4 key={game.location}>{game.location}</h4>
        <h3 key={i - 3000}>{game.points_for} - {game.points_against}</h3>
        <button key={i + 2993992} value={true} onClick={(e) => handleClick(e, game.id)}>In</button>
        <button key={i - 2993992} value={false} onClick={(e) => handleClick(e, game.id)}>Out</button>
        {attendance(game.attendings)}
        </div>
        )
        }
    })

    const pastGames = teamGames.map((game, i) => {
        if(game['past?']){
            return (
                <div key={game.id + 3000} style={{backgroundColor: 'grey'}}>
                <h4 key={game.datetime}>{game.datetime}</h4>
                <h4 key={game.opponent}>{game.opponent}</h4>
                <h4 key={game.id}>{game.home ? '@Home' : `@${game.opponent}`}</h4>
                <h4 key={game.location}>{game.location}</h4>
                <h3 key={i - 3000}>{game.points_for} - {game.points_against}</h3>
                <UpdateStatsForm/>
                </div>
            )
        }
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
                    <td key={i}>{value}</td>
                
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
            <button onClick={() => navigate(-1)}>Back</button>
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
                <h2>Upcoming Games:</h2>
                {upcomingGames}
            </div>
            <div>
                <h2>Past Games:</h2>
                {pastGames}
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
                    {statData}
                </table>
            </div>
        </div>
    )
}

export default TeamDetails