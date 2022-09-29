import { Card, CardContent, Slider, CardActions, Button, Typography, TextField } from '@mui/material';
import React from 'react';
import './FriendCard.scss';

const backgroundColors = {
  1: '#d1bccf',
  2: '#b28faf',
  3: '#93628e',
  4: '#834c7e',
  5: '#641f5e'
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
      backgroundColor: backgroundColors[friendRating],
      color: friendRating > 3 ? 'white' : 'black'
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