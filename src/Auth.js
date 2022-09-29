import React from "react";

import Button from '@mui/material/Button';

const Auth = ({ start, signOut, user }) => {
  start();
  console.log('rendering Auth with user', user);
  
  if (user) {
    return (
      <Button onClick={signOut}>Sign out</Button>
    )
  }
  return (
    <div
      id="firebaseui-auth-container"
    ></div>
  )
}

export default Auth