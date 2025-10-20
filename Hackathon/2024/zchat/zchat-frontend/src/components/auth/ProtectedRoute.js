import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// const checkTokenStatus = async () => {
//   const token = localStorage.getItem('access_token');
//   if (!token) return false;

//   try {
//     const response = await fetch('https://zchat-api.onrender.com/token_status/', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     const data = await response.json();
//     return data.status === 'valid';
//   } catch (error) {
//     console.log('Error checking token status:', error);
//     return false;
//   }
// };

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkTokenStatus = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return false;
    
      try {
        const response = await fetch('https://zchat-api.onrender.com/token_status/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        const data = await response.json();
        return data.status === 'valid';
      } catch (error) {
        console.log('Error checking token status:', error);
        return false;
      }
    };
    const authenticate = async () => {
      const status = await checkTokenStatus();
      setIsAuthenticated(status);
    };
    authenticate();
  }, [])

  // useEffect(() => {
  //   const authenticate = async () => {
  //     const status = await checkTokenStatus();
  //     setIsAuthenticated(status);
  //   };
  //   authenticate();
  // }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
