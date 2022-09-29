import { Card, CardContent, Slider, CardActions, Button, Typography, TextField } from '@mui/material';
import React from 'react';
import './FriendCard.scss';

const backgroundColors = {
  // Red Green
  1: '#EE6055',
  2: '#ff9b85',
  3: '#ffd97d',
  4: '#cbf9b3',
  5: '#60d394'

  // Brights
  // 1: '#FF595E',
  // 2: '#FFCA3A',
  // 3: '#59FF19', // created out of nowhere (between yellow and green)
  // 4: '#8AC926',
  // 5: '#1982C4',

  // pastels
  // 1: '#FF777B',
  // 2: '#FDA3A2',
  // 3: '#EAE4E8', // clashes a little
  // 4: '#94C6FF',
  // 5: '#6AA7F7'
}

function FriendCard(props) {
  const { friend, update, deleteFriend } = props;
  const [friendRating, setFriendRating] = React.useState(friend.rating);
  const [friendName, setFriendName] = React.useState(friend.name);
  const [editMode, setEditMode] = React.useState(false);

  function handleActionClick() {
    if (editMode) {
      submitEdit();
      return
    }
    setEditMode(true);
  }

  function handleEditKeyPress(event) {
    if (event.key === 'Enter') {
      submitEdit();
    }
  }

  function submitEdit() {
    setEditMode(false);
    if (friendName.length === 0) {
      deleteFriend(friend);
      return;
    }
    update(friend.id, { name: friendName });
  }

  function changeRating(_, newRating) {
    setFriendRating(newRating);
    update(friend.id, { rating: newRating });
  }

  return (
    <Card className='friendCard' sx={{
      backgroundColor: backgroundColors[friendRating]
    }}>
      <CardContent className='friendCard-content'>
        <TextField
          autoFocus
          inputRef={input => input && input.focus()}
          label="Name"
          value={friendName}
          onChange={value => setFriendName(value.target.value)}
          variant="standard"
          required
          style={{display: editMode? 'block' : 'none'}}
          className='friendCard-heading'
          onKeyDown={handleEditKeyPress}
        >
          friend field
        </TextField>
        <Typography
          variant='h6'
          display={editMode? 'none' : 'block'}
          className='friendCard-heading'
        >
          {friend.name}
        </Typography>
        <div className='friendCard_rating'>
          <Slider
            className="friendCard_slider"
            aria-label="rating"
            onChange={changeRating}
            defaultValue={friendRating}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            color="black"
          />
          <div className='friendCard_label'>Add to the pool {friendRating} times</div>
        </div>
      </CardContent>
      <CardActions>
        <Button className="friendCard_action" onClick={handleActionClick}>{editMode? 'Submit' : 'Edit'}</Button>
        <Button className="friendCard_action" onClick={() => {deleteFriend(friend)}}>Delete</Button>
      </CardActions>
    </Card>
  )
}

export default FriendCard