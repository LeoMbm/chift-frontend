import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import Settings from '../../Utils/Constant';


axios.defaults.baseURL= Settings.URL_BACKEND;
axios.defaults.withCredentials = true

const Header = ({Logged, setLogged}) => {
  const navigate = useNavigate();

  const handleSubmit =  () => {
   
      sessionStorage.removeItem("JWT");
      setLogged(false);
      navigate("/");
 
  };

  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <NavLink to="/" className="btn btn-ghost normal-case text-xl">Chift</NavLink>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal p-0">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        {Logged ? (
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/profile" className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li><button onClick={handleSubmit} >Logout</button></li>
            </ul>
              </div>

        ): (
            <li><NavLink to="/login" >Sign In</NavLink></li>
        )}
         </ul>
         </div>
        
  </div>
  );
};

export default Header;
