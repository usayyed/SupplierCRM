import React, { Component } from 'react';
import { Button } from 'element-react';

class MultiOptionCard extends Component {
  render() {
    return (
      <div>
        <div className="moc-header">
          <label>{this.props.title}</label>
          <Button type="primary" icon="plus" onClick={() => this.props.onAdd()} size="small"></Button>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default MultiOptionCard; 