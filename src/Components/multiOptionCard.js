import React, { Component } from 'react';
import {Card} from 'element-react';

class MultiOptionCard extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    return (
      <div>
          <Card>
          {this.props.children}
          </Card>
      </div>
    )
  }
}

export default MultiOptionCard; 