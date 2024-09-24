// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const [error, setError] = useState(''); // State for storing backend error message

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');

            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            console.log('Login Successful:', response.data);
            navigate('/login-successful');

            // Save the JWT token to localStorage or cookies
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Error logging in', error);

            if (error.response && error.response.data) {
                setError(error.response.data.msg);
                alert(error.response.data.msg);
            } else {
                setError('Something went wrong. Please try again.');
                alert('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link to={'/register'}><p>New User? Please signup first.</p></Link>
        </div>
    );
};

export default Login;
