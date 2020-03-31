import React, { Component } from 'react';
import {Button} from 'element-react';
import SingleOptionCard from './singleOptionCard';

class MultiOptionCard extends Component {
  constructor(props) {
    super(props);

    // Bind the this context to the handler function
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      childComponents : []
    }
  }
  
  onAdd() {
    const childComponents = this.state.childComponents
    childComponents.push(this.props.children);

    this.setState({
      ...this.state,
      childComponents,
    });
  }

  onDelete(idx) {
    const childComponents = this.state.childComponents.filter((c, i) => i !== idx)

    this.setState({
      ...this.state,
      childComponents,
    });
  }
  
  render() {
    return (
      <div>
        <div className="moc-header">
          <label>{this.props.title}</label>
          <Button type="primary" icon="plus" onClick={() => this.onAdd()} size="small"></Button>
        </div>
        {this.state.childComponents.map((child, idx) => (
          <SingleOptionCard key={idx} cardId={idx} onDelete={this.onDelete}>
            {child}
          </SingleOptionCard>
        ))}
      </div>
    )
  }
}

export default MultiOptionCard; 