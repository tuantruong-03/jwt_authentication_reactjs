import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

const Home: React.FC = () => {
    return (
        <div className="container mt-5 text-center">
            <h1>Homepage</h1>
            <Link to="/profile" className="btn btn-primary btn-lg mt-3">
                Click to see your profile
            </Link>
        </div>
    );
};

export default Home;
