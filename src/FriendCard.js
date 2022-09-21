import { Card, CardContent, Slider } from '@mui/material';
import React from 'react';
import './FriendCard.scss'

class FriendCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendRating: 3
    };
  }
  
  setFriendRating(event, newRating) {
    console.log(event, newRating)
    this.setState({ friendRating: newRating })
  }

  render() {
    return (
      <Card className='friendCard'>
        <CardContent className='friendCard-content'>
          <h4 className='friendCard-heading'>
            {this.props.name}
          </h4>
          <div className='friendCard_rating'>
            <Slider
              className="friendCard_slider"
              aria-label="rating"
              onChange={this.setFriendRating.bind(this)}
              defaultValue={3}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
            <div className='friendCard_label'>Add to the pool {this.state.friendRating} times</div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default FriendCard