/*eslint no-useless-escape: 0*/
import React, { Component } from "react";
import { Input, Form, Card, Button } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class SalConFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      count: 1,
      min: 1,
      max: 1
    };
  }

  onAdd() {
  }

  onDelete(index) {
  }

  onChange(index, key, value) {
    const dataCopy = JSON.parse(JSON.stringify(this.props.data));
    dataCopy[index][key] = value
    this.props.onUpdate("salesContact", dataCopy);
  }

  render() {
    return (
      <MultiOptionCard
        hidden={true}
        title="Enter Sales Contact Info"
        onAdd={this.onAdd}
        min={this.state.min}
        max={this.state.max}
        count={this.state.count}
      >
        {this.props.data.map((salCon, index) => {
          return (
            <Card key={index}>
              <div>
                <Button type="primary" onClick={() => this.props.onCopy('administrativeContact', 'salesContact')}>Copy from above</Button>
              </div>
              <Form.Item
                key={index}
                prop={`salesContact:${index}`}
                rules={{
                  type: "object",
                  fields: {
                    name: {
                      required: true,
                      message: "Name can not be empty",
                      trigger: "blur,change"
                    },

                    email: [
                      {
                        required: true,
                        message: "Email can not be empty",
                        trigger: "blur,change"
                      },
                      {
                        trigger: "blur,change",
                        validator: (rule, value, callback) => {
                          var emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
                          if (!emailPattern.test(value)) {
                            callback(
                              new Error(
                                "Email error: Invalid Email. Please Enter valid Email address"
                              )
                            );
                          } else {
                            callback();
                          }
                        }
                      }
                    ],

                    phone: [
                      {
                        required: true,
                        message: "Phone can not be empty",
                        trigger: "blur,change"
                      },
                      {
                        trigger: "blur,change",
                        validator: (rule, value, callback) => {
                          var phonePattern = /^\d{10}$/;
                          if (!phonePattern.test(value)) {
                            callback(
                              new Error(
                                "Phone# error: Invalid Phone number. Please Enter 10 digit phone number"
                              )
                            );
                          } else {
                            callback();
                          }
                        }
                      }
                    ]
                  }
                }}
              >
                <SingleOptionCard
                  hidden={true}
                  onDelete={this.onDelete}
                  index={index}
                  disabledDelete={this.state.count <= this.state.min}
                >
                  <label>* Name: </label>
                  <Input
                    value={salCon.name}
                    onChange={value => this.onChange(index, "name", value)}
                  ></Input>
                  <label>* Email: </label>
                  <Input
                    value={salCon.email}
                    onChange={value => this.onChange(index, "email", value)}
                  ></Input>
                  <label>* Phone: (No dashes or Country code)</label>
                  <Input
                    value={salCon.phone}
                    onChange={value => this.onChange(index, "phone", value)}
                  ></Input>
                </SingleOptionCard>
              </Form.Item>
            </Card>
          );
        })}
      </MultiOptionCard>
    );
  }
}

export default SalConFormItem;
