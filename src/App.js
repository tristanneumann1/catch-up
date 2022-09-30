import { ReactComponent as Logo } from './logoWithText.svg';
import './App.scss';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import TocIcon from '@mui/icons-material/Toc';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Backdrop, CardContent, Link, Typography } from '@mui/material';
import FriendCard from './FriendCard';
import Friend from './Friend';
import Auth from './Auth';
import { Card } from 'react-bootstrap';

import { auth as firebaseUIAuth } from 'firebaseui';
import { EmailAuthProvider, getAuth, GoogleAuthProvider, signOut  } from "firebase/auth";

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

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

function App() {
  const [friends, updateFriends] = React.useState([]);

  const [dialogOpen, toggleDialog] = React.useState(false);

  const [winner, updateWinner] = React.useState(null);

  const [appUser, updateUser] = React.useState(null);

  const startAuth = () => {
  ui.start('#firebaseui-auth-container', uiConfig);
}

  const signOutAuth = () => {
    signOut(auth).then(() => {
      updateUser(null);
    }).catch((error) => {
      console.log('signed out error', error);
    });
  }

  auth.onAuthStateChanged((user) => {
    if (user && !appUser) {
      toggleDialog(false);
      updateUser(() => user);
      getFriends(user);
    }
  });

  const sortFriends = () => {
    updateFriends([...friends.sort((friend1, friend2) => friend2.rating - friend1.rating)]);
  }

  const getFriends = async (user) => {
    const friendsCollection = collection(db, 'users', user.uid, 'friends');
    let friendsSnap;
    try {
      friendsSnap = await getDocs(friendsCollection);
    } catch (err) {
      console.error('error getting friends', err);
    }
    if (friendsSnap.size > 0) {
      updateFriends(friendsSnap.docs.map(friend => {
        const friendData = friend.data();
        friendData.id = friend.id;
        return new Friend(friendData);
      }).sort((friend1, friend2) => friend2.rating - friend1.rating));
    }
  }
  const deleteFriend = async (friendToDelete) => {
    if (appUser) {
      const friendsRef = doc(db, 'users', appUser.uid, 'friends', friendToDelete.id);
      try {
        await deleteDoc(friendsRef);
      } catch(error) {
        console.error(error);
        return
      }
    }
    const newFriends = friends.filter(friend => {
      if (friend.id === friendToDelete.id) {
        return false;
      }
      return true;
    })
    updateFriends(newFriends);
  }

  const updateFriend = async (friendId, newFriendFields) => {
    const newFriends = friends.map(friend => {
      if (friend.id === friendId) {
        return Object.assign(friend, newFriendFields);
      }
      return friend;
    });
    updateFriends(newFriends);
    if (appUser) {
      const friendsRef = doc(db, 'users', appUser.uid, 'friends', friendId);
      try {
        await updateDoc(friendsRef, newFriendFields);
      } catch(error) {
        console.error(error);
        updateFriends(friends); // revert to how it was before update
        return
      }
    }
  };

  const addFriend = async () => {
    const newFriend = new Friend();
    const newFriends = [...friends, newFriend];
    if (appUser) {
      const friendsRef = doc(db, 'users', appUser.uid, 'friends', newFriend.id);
      try {
        await setDoc(friendsRef, {
          name: newFriend.name,
          rating: newFriend.rating
        });
      } catch(error) {
        console.error(error);
        return
      }
    }
    updateFriends(newFriends);
  }

  const randomize = () => {
    const friendPool = [];
    for (const friend of friends) {
      for (let i = 0; i < friend.rating; i++) {
        friendPool.push(friend);
      }
    }

    const newWinner = friendPool[Math.floor(Math.random() * friendPool.length)];
    updateWinner(newWinner);
  }

  return (
    <div className="App" id="App">
      <div className='App-home'>
        <header className="App-header">
          <Logo className='App-logo' />
          <p className='App-heading'>
            Stay in touch with old friends, input all their names, and we'll provide a regular check in contact.
          </p>
          <Button variant="contained" onClick={randomize}>
            <FontAwesomeIcon className="App-button_icon" icon={faPhone} /> Give someone a call
          </Button>
          <Typography variant='h5' className={'App-winner' + (winner ? ' active' : '')}>
            &#127881; Today you should call
            <b> {winner?.name} </b>
            &#127881;
          </Typography>
        </header>
        <Link href="#friendList" className="App-descend">
          <IconButton aria-label="descend" className='App-button_descend'>
            <ExpandMoreIcon className="big-icon" />
          </IconButton>
        </Link>
        <IconButton
          aria-label="profile"
          className='App-button_profile'
          onClick={() => toggleDialog(true)}
        >
          <PersonIcon className="big-icon" />
        </IconButton>
        <Backdrop
          open={dialogOpen}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          className='App-dialog'
          onClick={(e) => {
            e.stopPropagation();
            toggleDialog(false)}
          }
        >
          <Card>
            <CardContent>
              <Auth start={startAuth} signOut={signOutAuth} user={appUser}/>
            </CardContent>
          </Card>
        </Backdrop>
      </div>
      <div className='friendList'>
        <div className='friendList-content'>
          <div className='friendList-header'>
            <h2 id='friendList'>Friend List</h2>
            <div className='friendList-button_sort'>
              <IconButton
                aria-label="sort"
                onClick={sortFriends}
              >
                <TocIcon className="big-icon" />
              </IconButton>
            </div>
          </div>
          {
            friends.map(friend => {
              return <FriendCard
                key={friend.id}
                deleteFriend={deleteFriend}
                update={updateFriend}
                friend={friend}
              />
            })
          }
        </div>
        <IconButton aria-label="add" className='App-button_add' onClick={addFriend}>
          <AddIcon className="big-icon" id="firebaseui-auth-container" />
        </IconButton>
      </div>
    </div>
  );
}

export default App;
