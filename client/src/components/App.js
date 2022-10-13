import '../App.css';
import { Route, Routes, useParams } from 'react-router-dom'
import Teams from './Teams';
import TeamDetails from './TeamDetails';
import { useEffect, useState } from 'react';
import Team from './Team';

function App() {

  // const {teamId} = useParams()

  const [userData, setUserData] = useState()
  const [userTeams, setUserTeams] = useState([])

  const getTeams = () => {
    fetch(`http://localhost:3000/users/231`)
    .then(res => res.json())
    .then((data) => {
      setUserData(data)
      setUserTeams(data.teams)
    })
  }

  useEffect(() => {
    getTeams()
  }, [])
  
  // console.log(teamId)


  return (
    <Routes>
      <Route path='/' element={<Teams userTeams={userTeams}/>} />
      <Route path='team' element={<Team/>}>
        <Route path=':id' element={<TeamDetails/>} />
      </Route>
    </Routes>
  );
}

export default App;
