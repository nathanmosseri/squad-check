import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import NewGameForm from "./NewGameForm";
import UpdateStatsForm from "./UpdateStatsForm";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamDetails = ({statsUpdated, setStatsUpdated, gameCreated, setGameCreated, teamRoster, setTeamRoster}) => {

const {id} = useParams()

const [userTeams, setUserTeams] = useState([])
const [teamGames, setTeamGames] = useState([])
const [playerStats, setPlayerStats] = useState([])
const [teamSport, setTeamSport] = useState([])
const [keys, setKeys] = useState([])
const [isAdmin, setIsAdmin] = useState([])
const [attendanceClick, setAttendanceClick] = useState(false)
const [gameDeleted, setGameDeleted] = useState(false)
const [gameScore, setGameScore] = useState({
    points_for: 0,
    points_against: 0
})
const [scoreUpdated, setScoreUpdated] = useState(false)

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
            } else if (data.team.basketball_stats.length <= 0 && data.team.baseball_stats.length <= 0){
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
    }, [gameCreated, attendanceClick, scoreUpdated, statsUpdated, gameDeleted])

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
                    {coming.map((user) => <li key={uuidv4()}>{user}</li>)}
                </ul>
                <p>Out:</p>
                <ul>
                    {notComing.map((user) => <li key={uuidv4()}>{user}</li>)}
                </ul>
                <p>Undecided:</p>
                <ul>
                    {undecided.map((user) => <li key={uuidv4()}>{user}</li>)}
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
            setAttendanceClick(prev => !prev)
        })
    }

    const handleGameDelete = (e, id) => {
        let token = localStorage.getItem('token')
        fetch(`http://localhost:3000/games/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => setGameDeleted(prev => !prev))
    }
    
    const upcomingGames = teamGames.map((game, i) => {
        if(game['past?'] === false){
        return (
        <div key={uuidv4()}>
        <Card style={{ width: '50rem', margin: '7rem' }}>
        <Card.Body>
            <Card.Title>{game.formatted_date}</Card.Title>
            <Button variant="outline-success" size="sm" key={uuidv4()} value={true} onClick={(e) => handleClick(e, game.id)}>In</Button>
            <Button variant="outline-danger" size="sm" key={uuidv4()} value={false} onClick={(e) => handleClick(e, game.id)}>Out</Button>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>{game.opponent}</ListGroup.Item>
            <ListGroup.Item>{game.home ? '@Home' : `@${game.opponent}`}</ListGroup.Item>
            <ListGroup.Item>{game.location}</ListGroup.Item>
            <ListGroup.Item>{attendance(game.attendings)}</ListGroup.Item>
        </ListGroup>
        {isAdmin ? <Button onClick={(e) => handleGameDelete(e, game.id)} variant="outline-danger" size="sm">Delete Game</Button> : null}
        </Card>
        </div>
        )
        }
    })

    const handleScoreChange = (e) => {
        setGameScore({
            ...gameScore,
            [e.target.name]: e.target.value
        })
    }

    const handleScoreSubmit = (e, gameId) => {
        e.preventDefault()
        let token = localStorage.getItem('token')
        fetch(`http://localhost:3000/games/${gameId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(gameScore)
        }).then(res => res.json())
        .then((data) => {
            setScoreUpdated(prev => !prev)
            setGameScore({
                points_for: 0,
                points_against: 0
            })
        })
        
        let recordObj = {}
        if(gameScore.points_for > gameScore.points_against){
            recordObj = {wins: 1}
        } else if(gameScore.points_for < gameScore.points_against){
            recordObj = {loses: 1}
        } else if(gameScore.points_for === gameScore.points_against){
            recordObj = {ties: 1}
        }
        fetch(`http://localhost:3000/teams/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(recordObj)
        }).then(res => res.json())
        .then((data) => {
            
        })
    }

    const statsHeaders = Object.keys(keys).map((key, i) => {
        if(key !== 'id'){
        return (
        <th key={uuidv4()}>{key.split('_').join(' ')}</th>
        )
        }
    })

    const statData = playerStats.map((stat) => {
        const tableData = Object.keys(stat).map((value, i) => {
            if(value !== 'id'){
            return (
                <td key={uuidv4()}>{stat[value]}</td>
            )
            }
        })
        return (
            <tbody key={uuidv4()}>
                <tr key={uuidv4()}>
                    {tableData}
                </tr>
            </tbody>
        )
    })

    const gameStats = (stats) => {
        return stats.map((stat) => {
            if(teamSport === 'Hockey'){
            return (
                <tbody key={uuidv4()}>
                    <tr key={uuidv4()}>
                        <td key={uuidv4()}>{stat.name}</td>
                        <td key={uuidv4()}>{stat.games_played}</td>
                        <td key={uuidv4()}>{stat.goals}</td>
                        <td key={uuidv4()}>{stat.assists}</td>
                        <td key={uuidv4()}>{stat.penalty_minutes}</td>
                        <td key={uuidv4()}>{stat.plus_minus}</td>
                        <td key={uuidv4()}>{stat.saves}</td>
                        <td key={uuidv4()}>{stat.goals_allowed}</td>
                    </tr>
                </tbody>
            )
            } else if(teamSport === 'Baseball'){
                return (
                    <tbody key={uuidv4()}>
                        <tr key={uuidv4()}>
                            <td key={uuidv4()}>{stat.name}</td>
                            <td key={uuidv4()}>{stat.games_played}</td>
                            <td key={uuidv4()}>{stat.at_bats}</td>
                            <td key={uuidv4()}>{stat.runs_batted_in}</td>
                            <td key={uuidv4()}>{stat.home_runs}</td>
                            <td key={uuidv4()}>{stat.hits}</td>
                            <td key={uuidv4()}>{stat.batter_strikeouts}</td>
                            <td key={uuidv4()}>{stat.batter_walks}</td>
                            <td key={uuidv4()}>{stat.stolen_bases}</td>
                            <td key={uuidv4()}>{stat.innings_pitched}</td>
                            <td key={uuidv4()}>{stat.hits_allowed}</td>
                            <td key={uuidv4()}>{stat.runs_allowed}</td>
                            <td key={uuidv4()}>{stat.pitcher_strikeouts}</td>
                            <td key={uuidv4()}>{stat.pitcher_walks}</td>
                        </tr>
                    </tbody>
                )
            } else if(teamSport === 'Basketball'){
                return (
                    <tbody key={uuidv4()}>
                        <tr key={uuidv4()}>
                            <td key={uuidv4()}>{stat.name}</td>
                            <td key={uuidv4()}>{stat.games_played}</td>
                            <td key={uuidv4()}>{stat.points}</td>
                            <td key={uuidv4()}>{stat.assists}</td>
                            <td key={uuidv4()}>{stat.blocks}</td>
                            <td key={uuidv4()}>{stat.rebounds}</td>
                            <td key={uuidv4()}>{stat.steals}</td>
                            <td key={uuidv4()}>{stat.three_pointers_hit}</td>
                            <td key={uuidv4()}>{stat.three_pointers_attempted}</td>
                        </tr>
                    </tbody>
                )
            }
        })
    }

    const pastGames = teamGames.map((game, i) => {
        let sport;
        if(teamSport === 'Hockey'){
            sport = game.game_hockey_stats
        } else if(teamSport === 'Baseball'){
            sport = game.game_baseball_stats
        } else if(teamSport === 'Basketball'){
            sport = game.game_basketball_stats
        }
        if(game['past?']){
            return (
                <div key={uuidv4()}>
                <Card style={{ width: teamSport === "Baseball" ? '60rem' : '50rem', margin: '7rem', backgroundColor: 'grey' }}>
                <Card.Body>
                    <Card.Title>{game.formatted_date}</Card.Title>
                </Card.Body>
                <Card.Body>
                    <Card.Title>Result: {game.points_for} - {game.points_against}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{game.opponent}</ListGroup.Item>
                    <ListGroup.Item>{game.home ? '@Home' : `@${game.opponent}`}</ListGroup.Item>
                    <ListGroup.Item>{game.location}</ListGroup.Item>
                    <ListGroup.Item>{attendance(game.attendings)}</ListGroup.Item>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>Game Stats</Accordion.Header>
                            <Accordion.Body>
                                    <Table striped bordered hover variant="dark" size={teamSport === 'Baseball' ? 'sm' : 'lg'}>
                                        <thead>
                                            <tr>
                                            {statsHeaders}
                                            </tr>
                                        </thead>
                                        {gameStats(sport)}
                                    </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    {isAdmin ? <Accordion defaultActiveKey={['0']} alwaysOpen >
                        <Accordion.Item eventKey="0" style={{backgroundColor: 'grey'}}>
                            <Accordion.Header>Update Results</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup.Item>
                    {isAdmin ? 
                    <Form key={uuidv4()} onSubmit={(e) => handleScoreSubmit(e, game.id)}>
                    <h5>Update Results</h5>
                    <Form.Group>
                        <Form.Label key={uuidv4()}>points for</Form.Label>
                        <Form.Control key={uuidv4()} value={gameScore.points_for} name="points_for" min={0} type='number' onChange={handleScoreChange}/>
                    </Form.Group>
                    - 
                    <Form.Group>
                        <Form.Control key={uuidv4()} value={gameScore.points_against} name="points_against" min={0} type='number' onChange={handleScoreChange}/> 
                        <Form.Label key={uuidv4()}>points against</Form.Label>
                    </Form.Group>
                    <Button variant="light" type="submit">Submit</Button>
                    </Form> : null}
                    </ListGroup.Item>
                    </Accordion.Body>
                    </Accordion.Item>
                    </Accordion> :
                    null
                    }
                    {isAdmin ? 
                    <Accordion>
                        <Accordion.Header>Update Stats</Accordion.Header>
                        <Accordion.Body>
                    <ListGroup.Item>{isAdmin ? <UpdateStatsForm key={uuidv4()} setStatsUpdated={setStatsUpdated} teamSport={teamSport} playerStats={playerStats} keys={keys} sport={sport}/> : null}
                    </ListGroup.Item>
                    </Accordion.Body>
                    </Accordion>
                    :
                    null
                    }
                </ListGroup>
                </Card>
                </div>
            )
        }
    })


    const roster = teamRoster.map((member) => {
        return <li key={uuidv4()}>{member.name}</li>
    })

    return (
        <div>
            <div className="team-details-header" style={{backgroundImage: `${userTeams.logo}`}}>
                <img style={{height: '18%', width: '18%', position: 'absolute', left: '1%', borderRadius: '5%'}} src={userTeams.logo} alt={`${userTeams.name} logo`}/>
                <h1>{userTeams.name}</h1>
                <h4>{userTeams.description}</h4>
                <h4>Season: {userTeams.season}</h4>
                <h4>League: {userTeams.league}</h4>
                <h4>Record: {userTeams.wins} - {userTeams.loses} - {userTeams.ties}</h4>
                {isAdmin? <p>Join Code: {userTeams.uid}</p> : null}
            </div>
            <div className="team-details-body">
            <div>
                {isAdmin ? <NewGameForm setGameCreated={setGameCreated}/> : null}
            </div>
            <div style={{float: "right", padding: '5%', width: '20%', height: '50%'}}>
                <Card style={{fontSize: '111%'}}>
                    <ul className="roster">
                        <Card.Title>Roster</Card.Title>
                        {roster}
                    </ul>
                </Card>
            </div>
            <div style={{padding: '1%'}}>
                <h2>Upcoming Games:</h2>
                {upcomingGames}
            </div>
            <div>
                <h2>Past Games:</h2>
                {pastGames}
            </div>
            <div>
                <h2>Stats</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        {statsHeaders}       
                    </tr>
                    </thead>
                    {statData}
                </Table>
            </div>
            </div>
        </div>
    )
}

export default TeamDetails