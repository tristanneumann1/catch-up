import { ReactComponent as Logo } from './logoWithText.svg';
import './App.scss';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { CardContent, Link, Typography } from '@mui/material';
import FriendCard from './FriendCard';
import Friend from './Friend';
import Auth from './Auth';
import { Card } from 'react-bootstrap';

function App() {
  const [friends, updateFriends] = React.useState([
    new Friend({ name: 'Tristans de 1234567890' }),
    new Friend({ name: 'Ben Demarcus' })
  ]);

  const [dialogOpen, toggleDialog] = React.useState(false);

  const [winner, updateWinner] = React.useState(null);

  const deleteFriend = (friendToDelete) => {
    const newFriends = friends.filter(friend => {
      if (friend.id === friendToDelete.id) {
        return false;
      }
      return true;
    })
    updateFriends(newFriends);
  }

  const updateFriend = (friendId, newFriend) => {
    const newFriends = friends.map(friend => {
      if (friend.id === friendId) {
        return newFriend;
      }
      return friend;
    });

    updateFriends(newFriends);
  };

  const addFriend = () => {
    const newFriends = [...friends, new Friend()]
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
        <div
          className='App-dialog'
          style={{visibility: dialogOpen ? 'visible' : 'hidden'}}
          onClick={() => toggleDialog(false)}
        >
          <Card>
            <CardContent>
              <Auth />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='friendList'>
        <div className='friendList-content'>
          <h2 id='friendList'>Friend List</h2>
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
