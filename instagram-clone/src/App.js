import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './screens/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './screens/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './screens/Createpost';
import React , {createContext , useState} from 'react';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  const [userLogin,setUserLogin] = useState(false)
  const [modalOpen,setModalOpen] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
    <GoogleOAuthProvider clientId="413028210873-gbijnm1aparncco7ukhpr9v5jasf9pma.apps.googleusercontent.com">
      <LoginContext.Provider value={{setUserLogin , setModalOpen}}>
     <Navbar login={userLogin}/>
     <Routes>
      <Route path='/' element = {<Home/>}></Route>
      <Route path='/signup' element = {<SignUp/>}></Route>
      <Route path='/signin' element = {<SignIn/>}></Route>
      <Route exact path='/profile' element = {<Profile/>}></Route>
      <Route path='/createpost' element = {<Createpost></Createpost>}></Route>
      <Route path='/profile/:userid' element = {<UserProfile></UserProfile>}></Route>
      <Route path='/followingpost' element = {<MyFollowingPost></MyFollowingPost>}></Route>
     </Routes>
     <ToastContainer  theme='dark'/>
     {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
     </LoginContext.Provider>
     </GoogleOAuthProvider>
    </div>
    </BrowserRouter>
  );
}

export default App;
