import { auth as firebaseUIAuth } from 'firebaseui';
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import React from "react";

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCYuupB1oZ8nngYeEP2Ci2eLtVuSJJzQ4g",
  authDomain: "catch-up-a1f28.firebaseapp.com",
  projectId: "catch-up-a1f28",
  storageBucket: "catch-up-a1f28.appspot.com",
  messagingSenderId: "278985999867",
  appId: "1:278985999867:web:0dc30a894c9be8ae00375e",
  measurementId: "G-1V4NQ30VGJ"
};

// Initialize Firebase
console.log('initialize app');
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log('getting auth')
const auth = getAuth();
const ui = new firebaseUIAuth.AuthUI(auth);

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      console.log('signInSuccessWithAuthResult callback: authResult, redirectUrl', authResult, redirectUrl);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      console.log('uiShown callback')
      // The widget is rendered.
      // Hide the loader.
      // document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '#',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

class Auth extends React.Component {
  componentDidMount() {
    console.log('start ui')
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div
        id="firebaseui-auth-container"
      >
      </div>
    )
  }
}

export default Auth