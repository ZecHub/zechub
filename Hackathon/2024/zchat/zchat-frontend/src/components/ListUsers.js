import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // Fetch the current user's information
    fetch('https://zchat-api.onrender.com/users/me/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data.username))
      .catch(error => console.error('Error fetching current user:', error));

    // Fetch all users excluding the current user
    fetch('https://zchat-api.onrender.com/users/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter out the current user
          const filteredUsers = data.filter(user => user.username !== currentUser);
          setUsers(filteredUsers);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [currentUser]);

  return (
    <div>
      <h2>Select a user to chat with</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/chat/${user.username}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
