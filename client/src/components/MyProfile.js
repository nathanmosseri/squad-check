import React from "react";

const MyProfile = ({userData, userHockeyStats, userBasketballStats, userBaseballStats, isLoggedIn}) => {

    const hockeyStats = userHockeyStats.map((stat) => {
        return (
            <tbody>
                <tr key={stat.id}>
                    <td>{stat.season}</td>
                    <td key={stat.name}>{stat.team_name}</td>
                    <td key={stat.games_played}>{stat.games_played}</td>
                    <td>{stat.goals}</td>
                    <td>{stat.assists}</td>
                    <td>{stat.penalty_minutes}</td>
                    <td>{stat.plus_minus}</td>
                    <td>{stat.saves}</td>
                    <td>{stat.goals_allowed}</td>
                    {/* <td>{stat.save_precentage}</td> */}
                </tr>
            </tbody>
        )
    })

    const baseballStats = userBaseballStats.map((stat) => {
        return (       
            <tbody>
                <tr>
                    <td>{stat.season}</td>
                    <td>{stat.team_name}</td>
                    <td>{stat.games_played}</td>
                    <td>{stat.at_bats}</td>
                    {/* <td>{stat.batting_average}</td> */}
                    <td>{stat.hits}</td>
                    <td>{stat.home_runs}</td>
                    <td>{stat.runs_batted_in}</td>
                    <td>{stat.batter_strikeouts}</td>
                    <td>{stat.batter_walks}</td>
                    <td>{stat.stolen_bases}</td>
                    <td>{stat.innings_pitched}</td>
                    {/* <td>{stat.earned_run_average}</td> */}
                    <td>{stat.pitcher_strikeouts}</td>
                    <td>{stat.pitcher_walks}</td>
                    <td>{stat.runs_allowed}</td>
                    <td>{stat.hits_allowed}</td>
                </tr>
            </tbody>    
        )
    })

    const basketballStats = userBasketballStats.map((stat) => {
        return (
            <tbody>
                <tr>
                    <td>{stat.season}</td>
                    <td>{stat.team_name}</td>
                    <td>{stat.games_played}</td>
                    <td>{stat.points}</td>
                    <td>{stat.assists}</td>
                    <td>{stat.rebounds}</td>
                    <td>{stat.blocks}</td>
                    <td>{stat.steals}</td>
                    {/* <td>{stat.three_pointer_percentage}</td> */}
                    <td>{stat.three_pointers_hit}</td>
                    <td>{stat.three_pointers_attempted}</td>
                </tr>
            </tbody>
        )
    })

    return (
        <div>
            <h1>{userData.name}</h1>
            {userHockeyStats.length > 0 ? <h2>Hockey Stats</h2>: null}
            {userHockeyStats.length > 0 ?
            <table>
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
                        {/* <th>Save %</th> */}
                    </tr>
                </thead>
                {hockeyStats}
            </table>
            :
            null    
            }
            {userBaseballStats.length > 0 ? <h2>Baseball Stats</h2>: null}
            {userBaseballStats.length > 0 ? 
            <table>
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>Team Name</th>
                        <th>Games Played</th>
                        <th>At Bats</th>
                        {/* <th>Batting Average</th> */}
                        <th>Hits</th>
                        <th>Home Runs</th>
                        <th>RBIs</th>
                        <th>Batter Strikeouts</th>
                        <th>Batter Walks</th>
                        <th>Stolen Bases</th>
                        <th>Innings Pitched</th>
                        {/* <th>ERA</th> */}
                        <th>Pitcher Strikeouts</th>
                        <th>Pitcher Walks</th>
                        <th>Runs Allowed</th>
                        <th>Hits Allowed</th>
                    </tr>
                </thead>
                {baseballStats}
            </table>    
            :
                null
            }
            {userBasketballStats.length > 0 ? <h2>Basketball Stats</h2> : null}
            {userBasketballStats.length > 0 ? 
                <table>
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
                            {/* <th>3 Point %</th> */}
                            <th>3 Pointers Hit</th>
                            <th>3 Pointers Attempted</th>
                        </tr>
                    </thead>
                    {basketballStats}
                </table>
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