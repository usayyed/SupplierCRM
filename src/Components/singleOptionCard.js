import React, { Component } from "react";
import { Button } from "element-react";

class SingleOptionCard extends Component {
  render() {
    return (
      <div>
        <div className="single-option-card">
          <div style={{ minWidth: "80%" }}>{this.props.children}</div>
          {!!!this.props.hidden ? (
            <div className="single-option-card-btn">
              <Button
                type="danger"
                icon="delete"
                size="small"
                onClick={() => this.props.onDelete(this.props.index)}
                disabled={this.props.disabledDelete}
              ></Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SingleOptionCard;
