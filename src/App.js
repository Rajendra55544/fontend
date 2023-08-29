// import logo from './logo.svg';
import { useContext } from 'react';
import './App.css';
import Login from './componets/Login';
import Signup from './componets/Singup';
import Header from './componets/Header';
import {BrowserRouter as Router,Routes, Route,Navigate } from 'react-router-dom';
// import Home from './componets/user/Home';
import { AuthContext } from './componets/LoginContext';
import NotFoundPage from './componets/404page';
import Dashboard from './componets/admin/Deshboard';
import Fileupload from './componets/user/Fileupload';
import Home from './componets/user/Home';
import Profile from './componets/user/Profile';
import Address from './componets/user/Address';
import AddAddress from './componets/user/Add_Address';
function App() {

  const { isAuthenticated } = useContext(AuthContext);
  if (window.location.host.split(".")[0] === "admin") {
    return (
      <>
          <Header />
          <Routes>
            <Route path="/login" element= {isAuthenticated?<Navigate to="/" />:<Login />} exact/> 
            <Route path="/" element={isAuthenticated?<Dashboard />:<Navigate to="/login" />}  exact/>     
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </>
    );
  }
  
  else if (window.location.host.split(".")[0] === "localhost:3000") {
  
    return (
      <>
        <Header />
          <Routes>
            {/* <Route path='/' element = {<Home />} /> */}
            <Route path="login/" element={<Login />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="/filupload" element={isAuthenticated?<Fileupload />:<Navigate to="/login" />}  exact/> 
            <Route path="/" element={isAuthenticated?<Home />:<Navigate to="/login" />}  exact/> 
            <Route path="/profile" element={isAuthenticated?<Profile />:<Navigate to="/login" />}  exact/> 
            <Route path="/address" element={isAuthenticated?<Address />:<Navigate to="/login" />}  exact/> 
            <Route path="/addaddress" element={isAuthenticated?<AddAddress />:<Navigate to="/login" />}  exact/> 
            <Route path="*" element={<NotFoundPage />} />
            
          </Routes>
          {/* <Footer /> */}
       
      </>
     
    );
  }
  else{
      console.log(window.location.host.split(".")[0]);
  }
}
export default App;
