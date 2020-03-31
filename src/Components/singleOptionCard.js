import React, { Component } from 'react';
import {Card, Button} from 'element-react';

class SingleOptionCard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    

    return (
      <div>
          <Card>
                <div className="single-option-card">
                    <div style={{"minWidth": "80%"}}>
                    {this.props.children}
                    </div>
                    <span>
                    <Button type="primary" icon="delete" size="small" onClick={() => this.props.onDelete(this.props.cardId)}></Button>
                    </span>
                </div>
                
            </Card>
       
      </div>
    )
  }
}

export default SingleOptionCard; 