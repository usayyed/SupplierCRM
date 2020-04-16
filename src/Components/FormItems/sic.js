import React, { Component } from "react";
import { Input, Form, Card, Button } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class SicFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      sicCodes: [],
      count: 0,
      min: 1,
      max: 5,
    };
  }

  onAdd() {
    this.state.sicCodes.push({
      value: "",
    });
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
    this.forceUpdate();
    this.props.onUpdate("sicCodes", this.state.sicCodes);
  }

  onDelete(index) {
    const sicCodesList = this.state.sicCodes.filter((s, i) => i !== index);

    this.setState({
      ...this.state,
      sicCodes: sicCodesList,
      count: this.state.count - 1,
    });

    this.forceUpdate();
    this.props.onUpdate("sicCodes", sicCodesList);
  }

  onChange(index, key, value) {
    this.state.sicCodes[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("sicCodes", this.state.sicCodes);
  }

  render() {
    return (
      <div>
        <MultiOptionCard
          title="List your SIC Codes"
          onAdd={this.onAdd}
          min={this.state.min}
          max={this.state.max}
          count={this.state.count}
        >
        <div className="form-link">
            <a href="https://siccode.com/sic-code-lookup-directory" target="_blank">
              SIC Codes
            </a>
          </div>
          {this.state.sicCodes.map((sicCode, index) => {
            return (
              <Card key={index}>
                <Form.Item
                  key={index}
                  label={`* SIC Code ${index + 1}`}
                  prop={`sicCodes:${index}`}
                  rules={{
                    type: "object",
                    fields: {
                      value: [
                        {
                          required: true,
                          message: "SIC Code can not be empty",
                          trigger: "blur",
                        },
                        {
                          trigger: "blur",
                          validator: (rule, value, callback) => {
                            var sicPattern = /^\d{4}$/;
                            if (!sicPattern.test(value)) {
                              callback(
                                new Error(
                                  "SIC# error: Invalid SIC number. Please Enter 4 digit SIC number"
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
                    <Input
                      value={sicCode.value}
                      onChange={(value) => this.onChange(index, "value", value)}
                    ></Input>
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

export default SicFormItem;
