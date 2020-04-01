import React, { Component } from 'react';
import { Button } from 'element-react';

class SingleOptionCard extends Component {
    render() {
        return (
            <div>
                <div className="single-option-card">
                    <div style={{ "minWidth": "80%" }}>
                        {this.props.children}
                    </div>
                    <span>
                        <Button type="primary" icon="delete" size="small" onClick={() => this.props.onDelete(this.props.index)}></Button>
                    </span>
                </div>
            </div>
        )
    }
}

export default SingleOptionCard; 