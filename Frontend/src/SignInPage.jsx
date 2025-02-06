import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const fetchUserFromCookies = () => {
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};

const saveUserToCookies = (user) => {
  Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Expires in 7 days
};

const SignInPage = ({ setUser }) => {
  const [userNameInput, setUserNameInput] = useState('');

  useEffect(() => {
    const user = fetchUserFromCookies();
    if (user) {
      setUser(user);
    }
  }, [setUser]);

  const handleInputChange = (event) => {
    setUserNameInput(event.target.value);
  };

  const handleButtonClick = () => {
    saveUserToCookies(userNameInput);
    setUser(userNameInput);
  };

  const user = fetchUserFromCookies();
  if (user) {
    return <div>Welcome back, {user}!</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User"
        value={userNameInput}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Sign In</button>
    </div>
  );
};

export default SignInPage;