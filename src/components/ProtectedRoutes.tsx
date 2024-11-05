import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

const ProtectedRoutes: React.FC = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      setShowMessage(true);

      // Set a timer to navigate after 3 seconds
      const timer = setTimeout(() => {
        setShowMessage(false);
        setRedirect(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (showMessage) {

    return (
      <div className="container mt-5 text-center">
          <h1>You need to log in to access this page. Redirecting...</h1>
      </div>
  );
  }

  // Only navigate after the timer has finished
  return redirect ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
