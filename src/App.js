import { ReactComponent as Logo } from './logoWithText.svg';
import './App.scss';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Link } from '@mui/material';
import FriendCard from './FriendCard';

class App extends React.Component {
  render() {
    return (
      <div className="App" id="App">
        <div className='App-home'>
          <header className="App-header">
            <Logo className='App-logo'/>
            <p className='App-heading'>
              Stay in touch with old friends, input all their names, and we'll provide a regular check in contact.
            </p>
            <Button variant="contained">
              <FontAwesomeIcon className="App-button_icon" icon={faPhone}/> Give someone a call
            </Button>
          </header>
          <Link href="#friendList" className="App-descend">
            <IconButton aria-label="descend" className='App-button_descend'>
              <ExpandMoreIcon 
              sx={{
                color: 'white',
                width: '2em',  
                height: '2em'
              }}/>
            </IconButton> 
          </Link>
        </div>
        <div className='friendList'>
          <div className='friendList-content'>
            <h2 id='friendList'>Friend List</h2>
            <FriendCard name="Tristans de 1234567890" />
            <FriendCard name="Juli Zylyftari" />
          </div>
          <IconButton aria-label="add" className='App-button_add'>
            <AddIcon 
            sx={{
              color: 'white'
            }}/>
          </IconButton> 
        </div>
      </div>
    );
  }
}

export default App;
