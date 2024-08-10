
import './App.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Signup } from './pages/Signup';
import { Route,Routes } from 'react-router-dom';
import { Otp } from './pages/Otp';
import Login from './pages/Login';
import { Navbarhome } from './pages/Navbar';
import { Tournament } from './pages/Tournament';
import { OneTournament } from './pages/OneTournament';
import { Navbar } from '@nextui-org/navbar';
import { Players } from './pages/Players';
import { Request } from './pages/Request';
import { Friends } from './pages/Friends';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { MyMatches } from './pages/MyMatches';
import { NotFound } from './pages/NotFound';



function App() {
  return (
    
    <div className="">
      <Navbarhome className="mb-4"></Navbarhome>
      {/* <h1>Welcome</h1> */}
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Home></Home>} />
        <Route path='/login' element = {<Login/>}/>
        <Route path='/tournament' element = {<Tournament/>}></Route>
        <Route path='/tournament/:id' element={<OneTournament></OneTournament>}></Route>
        <Route path='/players'element={<Players></Players>}></Route>
        <Route path='/request' element={<Request></Request>}></Route>
        <Route path='/friends' element={<Friends></Friends>}></Route>
        <Route path='/createpost' element={<CreatePost ></CreatePost>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/mymatches' element={<MyMatches></MyMatches>}></Route>
        <Route path='*' element={<NotFound></NotFound>}/>
      </Routes>
      <Toaster></Toaster>
  </div>

  );
}

export default App;
