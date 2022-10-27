import React from "react";
import {v4 as uuidv4} from 'uuid'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyProfile = ({ userData, userHockeyStats, userBasketballStats, userBaseballStats, isLoggedIn}) => {

    const hockeyStats = userHockeyStats.map((stat) => {
        return (
            <tbody key={uuidv4()}>
                <tr key={stat.id}>
                    <td key={uuidv4()}>{stat.season}</td>
                    <td key={uuidv4()}>{stat.team_name}</td>
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
    })

    const baseballStats = userBaseballStats.map((stat) => {
        return (       
            <tbody key={uuidv4()}>
                <tr key={uuidv4()}>
                    <td key={uuidv4()}>{stat.season}</td>
                    <td key={uuidv4()}>{stat.team_name}</td>
                    <td key={uuidv4()}>{stat.games_played}</td>
                    <td key={uuidv4()}>{stat.at_bats}</td>
                    <td key={uuidv4()}>{stat.hits}</td>
                    <td key={uuidv4()}>{stat.home_runs}</td>
                    <td key={uuidv4()}>{stat.runs_batted_in}</td>
                    <td key={uuidv4()}>{stat.batter_strikeouts}</td>
                    <td key={uuidv4()}>{stat.batter_walks}</td>
                    <td key={uuidv4()}>{stat.stolen_bases}</td>
                    <td key={uuidv4()}>{stat.innings_pitched}</td>
                    <td key={uuidv4()}>{stat.pitcher_strikeouts}</td>
                    <td key={uuidv4()}>{stat.pitcher_walks}</td>
                    <td key={uuidv4()}>{stat.runs_allowed}</td>
                    <td key={uuidv4()}>{stat.hits_allowed}</td>
                </tr>
            </tbody>    
        )
    })

    const basketballStats = userBasketballStats.map((stat) => {
        return (
            <tbody key={uuidv4()}>
                <tr key={uuidv4()}>
                    <td key={uuidv4()}>{stat.season}</td>
                    <td key={uuidv4()}>{stat.team_name}</td>
                    <td key={uuidv4()}>{stat.games_played}</td>
                    <td key={uuidv4()}>{stat.points}</td>
                    <td key={uuidv4()}>{stat.assists}</td>
                    <td key={uuidv4()}>{stat.rebounds}</td>
                    <td key={uuidv4()}>{stat.blocks}</td>
                    <td key={uuidv4()}>{stat.steals}</td>
                    <td key={uuidv4()}>{stat.three_pointers_hit}</td>
                    <td key={uuidv4()}>{stat.three_pointers_attempted}</td>
                </tr>
            </tbody>
        )
    })

    return (
        <div style={{backgroundColor: 'rgb(80, 77, 77)', height: '100vh'}}>
            <h1>{userData.name}</h1>
            {userHockeyStats.length > 0 ? <h2>Hockey Stats</h2>: null}
            {userHockeyStats.length > 0 ?
            <Table striped bordered hover variant="dark" size="sm">
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Team Name</th>
                        <th>Games Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Penalty Minutes</th>
                        <th>+/-</th>
                        <th>Saves</th>
                        <th>Goals Allowed</th>
                    </tr>
                </thead>
                {hockeyStats}
            </Table>
            :
            null    
            }
            {userBaseballStats.length > 0 ? <h2>Baseball Stats</h2>: null}
            {userBaseballStats.length > 0 ? 
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Team Name</th>
                        <th>Games Played</th>
                        <th>At Bats</th>
                        <th>Hits</th>
                        <th>Home Runs</th>
                        <th>RBIs</th>
                        <th>Batter Strikeouts</th>
                        <th>Batter Walks</th>
                        <th>Stolen Bases</th>
                        <th>Innings Pitched</th>
                        <th>Pitcher Strikeouts</th>
                        <th>Pitcher Walks</th>
                        <th>Runs Allowed</th>
                        <th>Hits Allowed</th>
                    </tr>
                </thead>
                {baseballStats}
            </Table>    
            :
                null
            }
            {userBasketballStats.length > 0 ? <h2>Basketball Stats</h2> : null}
            {userBasketballStats.length > 0 ? 
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Season</th>
                            <th>Team Name</th>
                            <th>Games Played</th>
                            <th>Points</th>
                            <th>Assists</th>
                            <th>Rebounds</th>
                            <th>Blocks</th>
                            <th>Steals</th>
                            <th>3 Pointers Hit</th>
                            <th>3 Pointers Attempted</th>
                        </tr>
                    </thead>
                    {basketballStats}
                </Table>
            :
                null
            }
            {userBaseballStats.length <= 0 && userBasketballStats.length <= 0 && userHockeyStats.length <= 0 ? 
            <h1>Your stats will show up here when you join teams and play!</h1>
            :
            null    
            }
        </div>
    )

}

export default MyProfile