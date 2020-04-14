import React, { Component } from "react";
import { Input, Form, Card, Button } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class ServicesFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      services: [],
      count: 0,
      min: 0,
      max: 5,
    };
  }

  onAdd() {
    this.state.services.push({
      name: "",
    });
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
    this.forceUpdate();
    this.props.onUpdate("services", this.state.services);
  }

  onDelete(index) {
    const servicesList = this.state.services.filter((s, i) => i !== index);

    this.setState({
      ...this.state,
      services: servicesList,
      count: this.state.count - 1,
    });

    this.forceUpdate();
    this.props.onUpdate("services", servicesList);
  }

  onChange(index, key, value) {
    this.state.services[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("services", this.state.services);
  }

  render() {
    return (
      <div>
        <MultiOptionCard
          title=" List your Services"
          onAdd={this.onAdd}
          min={this.state.min}
          max={this.state.max}
          count={this.state.count}
        >
          {this.state.services.map((service, index) => {
            return (
              <Card key={index}>
                <Form.Item
                  key={index}
                  label={`Service ${index + 1}`}
                  prop={`services:${index}`}
                  rules={{
                    type: "object",
                    fields: {
                      name: {
                        required: true,
                        message: "Service can not be empty",
                        trigger: "blur",
                      },
                    },
                  }}
                >
                  <SingleOptionCard
                    onDelete={this.onDelete}
                    index={index}
                    disabledDelete={this.state.count <= this.state.min}
                  >
                    <Input
                      value={service.name}
                      onChange={(value) => this.onChange(index, "name", value)}
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

export default ServicesFormItem;
