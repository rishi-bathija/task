import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {
    return (
        <div className='main'>
            <div className='btn-div'>
                <Link to={'/register'}><button>Signup</button></Link>

                <Link to={'/login'}><button>Login</button></Link>
            </div>
        </div>
    )
}

export default Home
