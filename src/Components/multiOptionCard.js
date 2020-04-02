import React, { Component } from "react";
import { Button } from "element-react";

class MultiOptionCard extends Component {
  constructor(props) {
    super(props);

    for (let i = 0; i < props.min; i++) {
      props.onAdd();
    }
  }

  render() {
    return (
      <div>
        <div className="moc-header">
          <label>{this.props.title}</label>
          {!!!this.props.hidden ? (
            <Button
              type="primary"
              icon="plus"
              onClick={() => this.props.onAdd()}
              size="small"
              disabled={this.props.count >= Number(this.props.max)}
            ></Button>
          ) : null}
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default MultiOptionCard;
