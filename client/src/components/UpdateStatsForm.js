import React, { useState } from "react";

const UpdateStatsForm = ({playerStats, keys, teamSport}) => {

    // const [basketballStatsFormData, setBasketballStatsFormData] = useState({
    //     games_played: 0,
    //     points: 0,
    //     assists: 0,
    //     blocks: 0,
    //     rebounds: 0,
    //     steals: 0,
    //     three_pointers_hit: 0,
    //     three_pointers_attempted: 0
    // })

    // const handleChange = (e) => {
    //     setBasketballStatsFormData({
    //     ...basketballStatsFormData,
    //     [e.target.name]: e.target.value
    //     })
    // }

    // const stats = playerStats.map((user) => {
    //     const statForm = Object.keys(user).map((data) => {
    //         if(data !== 'id' && data !== 'name'){
    //             return (
    //                 <td><input onChange={handleChange} name={data} min={data === 'plus_minus' ? null : 0} max={data === 'games_played' ? 1 : null} type='number' defaultValue={0}/></td>
    //             )
    //         }
    //     })
    //     return (
    //         <tbody>
    //             <tr>
    //                 <td>{user.name}</td>
    //                 {statForm}
    //             </tr>
    //         </tbody>
    //     )
    // })

    // const headers = Object.keys(keys).map((key) => {
    //     if(key !== 'id'){
    //     return (
    //         <th>{key.split('_').join(' ')}</th>
    //     )
    //     }
    // })

    // return (
    //     <div>
    //         <form>
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

}

export default UpdateStatsForm