import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Header/Header';

function App() {
  const authToken = sessionStorage.getItem('JWT')
  const [Logged, setLogged] = useState(()=>{
    if(authToken){
      return true
    }
    return false
  })
  return (
    <div className="App flex flex-col min-h-screen justify-between">
      <BrowserRouter>
      <Header Logged={Logged} setLogged={setLogged}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile Logged={Logged} setLogged={setLogged} />} />
      <Route path="/register" element={<Register  Logged={Logged} setLogged={setLogged}/>} />
      <Route path="/login" element={<Login Logged={Logged} setLogged={setLogged} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
