import React from 'react';
import LoginForm from '../Components/Form/LoginForm';

const Login = ({setLogged}) => {
    return (
        <div>
            <LoginForm setLogged={setLogged} />
        </div>
    );
};

export default Login;