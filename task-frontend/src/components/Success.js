import React from 'react';
import { useNavigate } from 'react-router-dom';


const Success = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h2>Welcome! You are logged in.</h2>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Success;
