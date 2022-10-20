import '../App.css';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Teams from './Teams';
import TeamDetails from './TeamDetails';
import { useEffect, useState } from 'react';
import Team from './Team';
import MyProfile from './MyProfile';
import Header from './Header'
import NewTeamForm from './NewTeamForm';
import Login from './Login';
import LandingPage from './LandingPage';
import SignUp from './SignUp';

function App() {

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState([])
  const [userTeams, setUserTeams] = useState([])
  const [userHockeyStats, setUserHockeyStats] = useState([])
  const [userBaseballStats, setUserBaseballStats] = useState([])
  const [userBasketballStats, setUserBasketballStats] = useState([])
  const [newTeamSubmitted, setNewTeamSubmitted] = useState(false)
  const [teamJoined, setTeamJoined] = useState(false)
  const [gameCreated, setGameCreated] = useState(false)
  const [loginData, setLoginData] = useState({username: '', password: ''})
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone_number: ''
  })
  
useEffect(() => {
        let token = localStorage.getItem('token')
        if(token && !userData.username){
            fetch('http://localhost:3000/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json())
            .then((data) => {
              setUserData(data)
              setUserTeams(data.teams)
              setUserHockeyStats(data.hockey_stats)
              setUserBaseballStats(data.baseball_stats)
              setUserBasketballStats(data.basketball_stats)
              setIsLoggedIn(true)
            })
        }
    }, [isLoggedIn, newTeamSubmitted, teamJoined])
  

  return (
    <div>
    <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='login' element={<Login setUserBasketballStats={setUserBasketballStats} setUserBaseballStats={setUserBaseballStats} setUserHockeyStats={setUserHockeyStats} setUserTeams={setUserTeams} setIsLoggedIn={setIsLoggedIn} loginData={loginData} setLoginData={setLoginData} userData={userData} setUserData={setUserData}/>} />
      <Route path='signup' element={<SignUp setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} signupData={signupData} setSignupData={setSignupData}/>} />
      <Route path='/teams' element={<Teams isLoggedIn={isLoggedIn} userTeams={userTeams}/>} />
      <Route path='teams/team' element={<Team/>}>
        <Route path=':id' element={<TeamDetails userData={userData} gameCreated={gameCreated} setGameCreated={setGameCreated}/>} />
      </Route>
      <Route path='my-profile' element= {<MyProfile isLoggedIn={isLoggedIn} userData={userData} userBasketballStats={userBasketballStats} userBaseballStats={userBaseballStats} userHockeyStats={userHockeyStats}/>}/> 
      <Route path='create-new-team' element={<NewTeamForm setTeamJoined={setTeamJoined} setNewTeamSubmitted={setNewTeamSubmitted} isLoggedIn={isLoggedIn}/>} />
    </Routes>
    </div>
  );
}

export default App;
