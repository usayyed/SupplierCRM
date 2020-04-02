/*eslint no-useless-escape: 0*/
import React, { Component } from "react";
import { Input, Form, Card } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class SupConFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      supCons: [],
      count: 0,
      min: 1,
      max: 1
    };
  }

  onAdd() {
    this.state.supCons.push({
      name: "",
      email: "",
      phone: "",
      location:""
    });
    this.setState({
      ...this.state,
      count: this.state.count + 1
    });
    this.forceUpdate();
    this.props.onUpdate("supCons", this.state.supCons);
  }

  onDelete(index) {
    const supConsList = this.state.supCons.filter(
      (s, i) => i !== index
    );

    this.setState({
      ...this.state,
      supCons: supConsList,
      count: this.state.count - 1
    });

    this.forceUpdate();
    this.props.onUpdate("supCons", supConsList);
  }

  onChange(index, key, value) {
    this.state.supCons[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("supCons", this.state.supCons);
  }

  render() {
    return (
      <MultiOptionCard
        hidden={true}
        title="Enter Main Supplier Contact Info"
        onAdd={this.onAdd}
        min={this.state.min}
        max={this.state.max}
        count={this.state.count}
      >
        {this.state.supCons.map((supCon, index) => {
          return (
            <Card key={index}>
              <Form.Item
                key={index}
              
                prop={`supCons:${index}`}
                rules={{
                  type: "object",
                  fields: {
                    name: {
                      required: true,
                      message: "Name can not be empty",
                      trigger: "blur"
                    },

                    email: [{
                      required: true,
                      message: "Email can not be empty",
                      trigger: "blur"},{ trigger: "blur",
                       validator: (rule, value, callback) => {
                var emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
                if (!emailPattern.test(value)) {
                  callback(new Error('Email error: Invalid Email. Please Enter valid Email address'));
                } else {
                  callback();
                }}
                  }],

                  phone:[{
                    required: true,
                      message: "Phone can not be empty",
                      trigger: "blur"} , {trigger: 'blur', validator: (rule, value, callback) => {
                                            var phonePattern = /^\d{9}$/
                                            if (!phonePattern.test(value)) {
                                            callback(new Error('Phone# error: Invalid Phone number. Please Enter 9 digit phone number'));
                                            } else {
                                            callback();
                                            }}}],

                 location: {
                      required: true,
                      message: "Location can not be empty",
                      trigger: "blur"
                    },
                  }
                    }}
              >
              <SingleOptionCard hidden={true} onDelete={this.onDelete} index={index} disabledDelete={this.state.count <= this.state.min}>
                  <label>Name: </label>
                  <Input
                    value={supCon.name}
                    onChange={value => this.onChange(index, "name", value)}
                  ></Input>
                  <label>Email: </label>
                  <Input
                    value={supCon.email}
                    onChange={value => this.onChange(index, "email", value)}
                  ></Input>
                  <label>Phone: </label>
                  <Input
                    value={supCon.phone}
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

export default SupConFormItem;
