/*eslint no-useless-escape: 0*/
import React, { Component } from "react";
import { Input, Form, Card } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class AdmConFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      administrativeContact: [],
      count: 0,
      min: 1,
      max: 1
    };
  }

  onAdd() {
    this.state.administrativeContact.push({
      name: "",
      email: "",
      phone: "",
      location: ""
    });

    this.setState({
      ...this.state,
      count: this.state.count + 1
    });
    this.forceUpdate();
    this.props.onUpdate("administrativeContact", this.state.administrativeContact);
  }

  onDelete(index) {
    const administrativeContactList = this.state.administrativeContact.filter((s, i) => i !== index);

    this.setState({
      ...this.state,
      administrativeContact: administrativeContactList,
      count: this.state.count - 1
    });

    this.forceUpdate();
    this.props.onUpdate("administrativeContact", administrativeContactList);
  }

  onChange(index, key, value) {
    this.state.administrativeContact[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("administrativeContact", this.state.administrativeContact);
  }

  render() {
    return (
      <MultiOptionCard
        title="Enter Administrator Contact Info"
        onAdd={this.onAdd}
        min={this.state.min}
        max={this.state.max}
        count={this.state.count}
        hidden={true}
      >
        {this.state.administrativeContact.map((admCon, index) => {
          return (
            <Card key={index}>
              <Form.Item
                key={index}
                prop={`administrativeContact:${index}`}
                rules={{
                  type: "object",
                  fields: {
                    name: {
                      required: true,
                      message: "Name can not be empty",
                      trigger: "blur"
                    },

                    location: {
                      required: true,
                      message: "Location can not be empty",
                      trigger: "blur"
                    },

                    email: [
                      {
                        required: true,
                        message: "Email can not be empty",
                        trigger: "blur"
                      },
                      {
                        trigger: "blur",
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
                        trigger: "blur"
                      },
                      {
                        trigger: "blur",
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
                  onDelete={this.onDelete}
                  index={index}
                  disabledDelete={this.state.count <= this.state.min}
                  hidden={true}
                >
                  <label>Name: </label>
                  <Input
                    value={admCon.name}
                    onChange={value => this.onChange(index, "name", value)}
                  ></Input>
                  <label>Email: </label>
                  <Input
                    value={admCon.email}
                    onChange={value => this.onChange(index, "email", value)}
                  ></Input>
                  <label>Phone: </label>
                  <Input
                    value={admCon.phone}
                    onChange={value => this.onChange(index, "phone", value)}
                  ></Input>
                  <label>Location: </label>
                  <Input
                    value={admCon.location}
                    onChange={value => this.onChange(index, "location", value)}
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

export default AdmConFormItem;
