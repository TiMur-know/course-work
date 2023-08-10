'use client'
import React, { createContext, useState } from 'react';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const user1 = { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', role: 'ADMIN' };
  const [user, setUser] = useState(user1);

  const loginUser = async(username,password) => {
    try {
      const userData={username,password}
      const response = await axios.post('/api/auth/enter', userData);
      const { success, user: loggedInUser } = response.data;

      if (success) {
        setUser(loggedInUser);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to log in.');
    }
  };
  const checkUser=async(login)=>{
    try{
      const response = await axios.get(`/api/auth/check?username=${login}`);
      const userData = response.data;
      if (userData && userData.length > 0) {
        return true; 
      } else {
        return false;
      }
    }catch(error){

    }
  }
  const logoutUser = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser,checkUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };