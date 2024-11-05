import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { UserContext } from '../hooks/UserContext';
import { log } from 'console';

const Profile: React.FC = () => {
    const context = useContext(UserContext)
    const {user, logout} = context
    return (
        <div className="container mt-5 text-center">
            <h1>Welcome</h1>
            <div className="btn btn-primary btn-lg mt-3">
                {user?.email}
            </div><br/>
            <div className="btn btn-lg border mt-3" onClick={() => logout()}>
                Logout
            </div>
        </div>
    );
};

export default Profile;
