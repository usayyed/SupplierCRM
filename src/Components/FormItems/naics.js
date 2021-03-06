import React, { Component } from "react";
import { Input, Form, Card, Button } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class NaicsFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      naicsCodes: [],
      count: 0,
      min: 1,
      max: 5,
    };
  }

  onAdd() {
    this.state.naicsCodes.push({
      value: "",
    });
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
    this.forceUpdate();
    this.props.onUpdate("naicsCodes", this.state.naicsCodes);
  }

  onDelete(index) {
    const naicsCodesList = this.state.naicsCodes.filter((s, i) => i !== index);

    this.setState({
      ...this.state,
      naicsCodes: naicsCodesList,
      count: this.state.count - 1,
    });

    this.forceUpdate();
    this.props.onUpdate("naicsCodes", naicsCodesList);
  }

  onChange(index, key, value) {
    this.state.naicsCodes[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("naicsCodes", this.state.naicsCodes);
  }

  render() {
    return (
      <div>
        <MultiOptionCard
          title="List your NAICS Codes"
          onAdd={this.onAdd}
          min={this.state.min}
          max={this.state.max}
          count={this.state.count}
        >
          <div className="form-link">
            <a href="https://www.naics.com/search/" target="_blank">
              NAICS Codes
            </a>
          </div>
          {this.state.naicsCodes.map((naicsCode, index) => {
            return (
              <Card key={index}>
                <Form.Item
                  key={index}
                  label={`* NAICS Code ${index + 1}`}
                  prop={`naicsCodes:${index}`}
                  rules={{
                    type: "object",
                    fields: {
                      value: [
                        {
                          required: true,
                          message: "NAICS Code can not be empty",
                          trigger: "blur",
                        },
                        {
                          trigger: "blur",
                          validator: (rule, value, callback) => {
                            var naicsPattern = /^\d{6}$/;
                            if (!naicsPattern.test(value)) {
                              callback(
                                new Error(
                                  "NAICS# error: Invalid NAICS number. Please Enter 6 digit NAICS number"
                                )
                              );
                            } else {
                              callback();
                            }
                          },
                        },
                      ],
                    },
                  }}
                >
                  <SingleOptionCard
                    onDelete={this.onDelete}
                    index={index}
                    disabledDelete={this.state.count <= this.state.min}
                  >
                  <div class="tooltip">
                    <span class="tooltiptext">Enter 6 digit NAICS code</span>
                    <Input
                      value={naicsCode.value}
                      onChange={(value) => this.onChange(index, "value", value)}
                    ></Input>
                    </div>
                  </SingleOptionCard>
                </Form.Item>
              </Card>
            );
          })}
        </MultiOptionCard>
        <div className="add-btn">
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.onAdd()}
            size="small"
            className=""
            disabled={this.state.count >= Number(this.state.max)}
          ></Button>
        </div>
      </div>
    );
  }
}

export default NaicsFormItem;
