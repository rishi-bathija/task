// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        passwordError: '',
        confirmPasswordError: '',
        backendError: '',
    });

    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Regex for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password strength using regex
        if (!passwordRegex.test(password)) {
            setErrors({
                ...errors,
                passwordError: 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character'
            });
            return;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPasswordError: 'Passwords do not match' });
            return;
        }

        try {
            setErrors({ passwordError: '', confirmPasswordError: '', backendError: '' });

            // Proceed with registration API call
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });

            console.log('Registration Successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error registering user', error);
            if (error.response && error.response.data) {
                setErrors({ ...errors, backendError: error.response.data.msg });
                alert(error.response.data.msg);
            } else {
                setErrors({ ...errors, backendError: 'Something went wrong. Please try again.' });
                alert('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
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
                {errors.passwordError && <p style={{ color: 'red' }}>{errors.passwordError}</p>}

                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
                {errors.confirmPasswordError && <p style={{ color: 'red' }}>{errors.confirmPasswordError}</p>}

                <button type="submit">Register</button>
            </form>
            {errors.backendError && <p style={{ color: 'red' }}>{errors.backendError}</p>} {/* Show backend error */}
            <Link to={'/login'}><p>Already a user? Please login</p></Link>
        </div>
    );
};

export default Register;
