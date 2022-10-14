import '../App.css';
import { Route, Routes, useParams } from 'react-router-dom'
import Teams from './Teams';
import TeamDetails from './TeamDetails';
import { useEffect, useState } from 'react';
import Team from './Team';
import MyProfile from './MyProfile';
import Header from './Header'
import NewTeamForm from './NewTeamForm';

function App() {

  const [userData, setUserData] = useState([])
  const [userTeams, setUserTeams] = useState([])
  const [userHockeyStats, setUserHockeyStats] = useState([])
  const [userBaseballStats, setUserBaseballStats] = useState([])
  const [userBasketballStats, setUserBasketballStats] = useState([])

  const getTeams = () => {
    fetch(`http://localhost:3000/users/259`)
    .then(res => res.json())
    .then((data) => {
      setUserData(data)
      setUserTeams(data.teams)
      setUserHockeyStats(data.hockey_stats)
      setUserBaseballStats(data.baseball_stats)
      setUserBasketballStats(data.basketball_stats)
    })
  }

  useEffect(() => {
    getTeams()
  }, [])
  

  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/' element={<Teams userTeams={userTeams}/>} />
      <Route path='team' element={<Team/>}>
        <Route path=':id' element={<TeamDetails/>} />
      </Route>
      <Route path='my-profile' element={<MyProfile userData={userData} userBasketballStats={userBasketballStats} userBaseballStats={userBaseballStats} userHockeyStats={userHockeyStats}/>} />
      <Route path='create-new-team' element={<NewTeamForm/>} />
    </Routes>
    </div>
  );
}

export default App;
