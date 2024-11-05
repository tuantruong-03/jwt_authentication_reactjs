import axios from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'universal-cookie';

const baseURL = process.env.REACT_APP_BACKEND_DOMAIN

interface User {
  email: string;
}

interface UserContextType {
  user: User | null;
  accessToken: string | null;
  login: (accessToken: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const initUserContext: UserContextType = {
  accessToken: null, 
  login: (string) => {},
  logout: () => {},
  fetchUser: async () =>  {},
  user: null,
}

export const UserContext = createContext<UserContextType>(initUserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const cookies = new Cookies(null, {path : '/'})
  const [accessToken, setAccessToken] = useState<string | null>(cookies.get('accessToken'));

  // Method to fetch user data from the /profile API
  const fetchUser = async () => {
    if (!accessToken) return;

    try {
      const response = await axios.get(`${baseURL}user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data  = response.data;

      if (response.status == 200) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  const login = (accessToken: string) => {
    setAccessToken(accessToken);
    cookies.set('accessToken', accessToken);
    fetchUser(); // Fetch user data after setting the token
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    cookies.remove('accessToken');
  };

  return (
    <UserContext.Provider value={{ user, accessToken, login, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
