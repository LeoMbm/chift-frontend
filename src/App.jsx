import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Header/Header';
import Contact from './Pages/Contact';
import axios from 'axios';

function App() {
  const authToken = sessionStorage.getItem('JWT')
  const [user, setUser] = useState({})
  const [partners, setPartners] = useState([])
  const [Logged, setLogged] = useState(()=>{
    if(authToken){
      return true
    }
    return false
  })

  useEffect(() =>  {
    if (Logged) {
      axios
        .get("/user", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          // console.log(response.data);
          setUser(response.data)
        })
        .catch((error) => console.log(error));
    }
  }, [Logged]);



  useEffect(() =>  {
    if (Logged) {
      axios
        .get("/odoo", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          console.log(response.data);
          setPartners(response.data)
        })
        .catch((error) => console.log(error));
    }
  }, [Logged]);
  
  
  return (
    <div className="App flex flex-col min-h-screen justify-between">
      <BrowserRouter>
      <Header Logged={Logged} setLogged={setLogged}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={Logged ? (<Profile user={user} Logged={Logged} setLogged={setLogged} />) : (<Navigate to="/login" />) } />
      <Route path="/register" element={<Register  Logged={Logged} setLogged={setLogged}/>} />
      <Route path="/login" element={<Login Logged={Logged} setLogged={setLogged} />} />
      <Route path="/contact" element={<Contact Partners={partners} Logged={Logged} setLogged={setLogged} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
