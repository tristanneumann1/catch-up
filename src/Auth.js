import React from "react";

import Button from '@mui/material/Button';

const Auth = ({ start, signOut, user }) => {
  start();
  
  if (user) {
    return (
      <Button variant="contained" onClick={signOut}>Sign out</Button>
    )
  }
  return (
    <div
      id="firebaseui-auth-container"
    ></div>
  )
}

export default Auth