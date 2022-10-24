import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid'

const UpdateStatsForm = ({setStatsUpdated, playerStats, keys, teamSport}) => {

    const [basketballStatsFormData, setBasketballStatsFormData] = useState({
        id: undefined,
        games_played: 0,
        points: 0,
        assists: 0,
        blocks: 0,
        rebounds: 0,
        steals: 0,
        three_pointers_hit: 0,
        three_pointers_attempted: 0
    })
    const [hockeyStatsFormData, setHockeyStatsFormData] = useState({
        id: undefined,
        goals: 0,
        assists: 0,
        penalty_minutes: 0,
        plus_minus: 0,
        saves: 0,
        goals_allowed: 0
    })
    const [baseballStatsFormData, setBaseballStatsFormData] = useState({
        id: undefined,
        games_played: 0, 
        at_bats: 0, 
        runs_batted_in: 0, 
        home_runs: 0, 
        hits: 0, 
        batter_strikeouts: 0, 
        batter_walks: 0, 
        stolen_bases: 0, 
        innings_pitched: 0, 
        hits_allowed: 0, 
        runs_allowed: 0, 
        pitcher_strikeouts: 0, 
        pitcher_walks: 0   
    })

    
    const handleChange = (e) => {
        if(teamSport === 'Basketball'){
            setBasketballStatsFormData({
                ...basketballStatsFormData,
                [e.target.name]: e.target.value
            })
        } else if(teamSport === 'Hockey'){
            setHockeyStatsFormData({
                ...hockeyStatsFormData,
                [e.target.name]: e.target.value
            })
        } else if(teamSport === 'Baseball'){
            setBaseballStatsFormData({
                ...baseballStatsFormData,
                [e.target.name]: e.target.value
            })
        }
    }
    
    const sportForm = () => {
        if(teamSport === 'Basketball'){
            return basketballStatsFormData
        } else if(teamSport === 'Hockey'){
            return hockeyStatsFormData
        } else if(teamSport === 'Baseball'){
            return baseballStatsFormData
        }
    }

    const handleSubmit = (e) => {
        
        e.preventDefault()
        let patchData = {}
        let token = localStorage.getItem('token')
        let sport;
        if (teamSport === 'Hockey'){
            sport = 'hockey_stats'
            //loop
                //patchData[key] = formData[key] + playerStats[key]
        } else if(teamSport === 'Baseball'){
            sport = 'baseball_stats'
        } else if(teamSport === 'Basketball'){
            sport = 'basketball_stats'
        }
        fetch(`http://localhost:3000/${sport}/${basketballStatsFormData.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(basketballStatsFormData)
        }).then(res => res.json())
        .then((data) => {
            if(data['error']){
                alert(data['error'])
            } else {
                setStatsUpdated(prev => !prev)
            }
        })
    }
    
    const statInputs = Object.keys(keys).map((stat) => {
        if(stat !== 'id' && stat !== 'name')
        return (
            <div key={uuidv4()}>
                <label key={uuidv4()}>{stat.split('_').join(' ')}</label>
                <input onChange={handleChange} value={basketballStatsFormData[stat]} name={stat} placeholder={stat.split('_').join(' ')} type='number' key={uuidv4()} min={stat === 'plus_minus' ? null : 0} max={stat === 'games_played' ? 1 : null} />
            </div>
        )
    })
    
    const playerDropdown = playerStats.map((player) => {
        return (
            <option value={player.id} key={uuidv4()} >{player.name}</option>
            )
        })
        
        return (
            <>
        <h1>Update stats</h1>
        <form onSubmit={handleSubmit}>
            <select value={basketballStatsFormData.id} name="id" onChange={handleChange}>
                <option>Select a Player</option>
                {playerDropdown}
            </select>
            {statInputs}
            <button type="submit">Save</button>
        </form>
        </>
    )
    
}

export default UpdateStatsForm
// const handleChange = (e, id, stats) => {
//     console.log(stats)
//     setBasketballStatsFormData({
//     ...basketballStatsFormData,
//     [e.target.name]: e.target.value
//     })
//     let token = localStorage.getItem('token')
//     let sport;
//     if (teamSport === 'Hockey'){
//         sport = 'hockey_stats'
//     } else if(teamSport === 'Baseball'){
//         sport = 'baseball_stats'
//     } else if(teamSport === 'Basketball'){
//         sport = 'basketball_stats'
//     }
//     fetch(`http://localhost:3000/${sport}/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'content-type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(stats[e.target.name] += basketballStatsFormData)
//     }).then(res => res.json())
//     .then((data) => {
//         console.log(data)
//     })
// }

// const stats = playerStats.map((user) => {
//     const statForm = Object.keys(user).map((data) => {
//         if(data !== 'id' && data !== 'name'){
//             return (
//                 <td key={uuidv4()}><input onChange={(e) => handleChange(e, user.id, user)} name={data} min={data === 'plus_minus' ? null : 0} max={data === 'games_played' ? 1 : null} type='number'  key={uuidv4()}/></td>
//             )
//         }
//     })
//     return (
//         <tbody key={uuidv4()}>
//             <tr key={uuidv4()}>
//                 <td key={uuidv4()}>{user.name}</td>
//                 {statForm}
//             </tr>
//         </tbody>
//     )
// })

// const headers = Object.keys(keys).map((key) => {
//     if(key !== 'id'){
//     return (
//         <th key={uuidv4()}>{key.split('_').join(' ')}</th>
//     )
//     }
// })

// const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log(basketballStatsFormData)
// }

// return (
//     <div>
//         <form onSubmit={handleSubmit}>
//         <table>
//             <thead>
//                 <tr>
//                     {headers}
//                 </tr>
//             </thead>
//             {stats}
//         </table>
//         <input type='submit'/>
//         </form>
//     </div>
// )