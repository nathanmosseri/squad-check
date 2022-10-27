import React from "react";

const LandingPage = () => {
    return (
        <div style={{backgroundColor: 'grey', height: '100vh'}} className='landing-page'>
            <div className="squad-check-top">
            <h1 style={{textAlign: 'center'}}>Squad-Check</h1>
            <p style={{textAlign: 'center'}}>The only tool you'll need to keep track of your squad's schedule,
                availability, and stats.
            </p>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="whole-landing-page-wrapper">
            <div style={{marginLeft: '15%'}} className='first-div-landing-page'>
            <h1>Scheduling</h1>
            <p>Squad-Check allows the team admin to input their upcoming games with
                information such as: 
            </p>
                <ul>
                    <li>Date and time</li>
                    <li>Opponent</li>
                    <li>Home or away game</li>
                    <li>Location of your game</li>
                </ul>
            <br/>
            <br/>
            <br/>
            <h1>Availability</h1>
            <p>Squad-Check allows your teammates to check in or out for an upcoming game so that your
                team has no surprises come game-time.
            </p>
            <p>No more Chasing after your teammates to find out if they can play or not!</p>
            </div>
            <div className="stats-div">
            <h1>Stats</h1>
            <p>When you create and join teams, new stat lines are generated for each team that will be
            updated by the team admin after each game.
            </p>
            <p>Your personal stats will also be updated and added to your profile page where you can see
            all of you total stats for each season and team across all supported sports
            </p>
            </div>
                      
            </div>
        </div>
    )
}

export default LandingPage