import React, { Component } from "react";
import { Input, Form, Card, DatePicker, Button, Select } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class CertificationsFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      certifications: [],
      count: 0,
      min: 0,
      max: 10,
    };
  }

  onAdd() {
    this.state.certifications.push({
      name: "",
      number: "",
      expiration: new Date(),
    });
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
    this.forceUpdate();
    this.props.onUpdate("certifications", this.state.certifications);
  }

  onDelete(index) {
    const certificationsList = this.state.certifications.filter(
      (s, i) => i !== index
    );

    this.setState({
      ...this.state,
      certifications: certificationsList,
      count: this.state.count - 1,
    });

    this.forceUpdate();
    this.props.onUpdate("certifications", certificationsList);
  }

  onChange(index, key, value) {
    this.state.certifications[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("certifications", this.state.certifications);
  }

  render() {
    return (
      <div>
        <MultiOptionCard
          title="List your Diverse Certifications"
          onAdd={this.onAdd}
          min={this.state.min}
          max={this.state.max}
          count={this.state.count}
        >
          {this.state.certifications.map((certification, index) => {
            return (
              <Card key={index}>
                <Form.Item
                  key={index}
                  label={`Certification ${index + 1}`}
                  prop={`certifications:${index}`}
                  rules={{
                    type: "object",
                    fields: {
                      name: {
                        required: true,
                        message: "Certification Name can not be empty",
                        trigger: "blur",
                      },
                      number: {
                        required: true,
                        message: "Certification Number can not be empty",
                        trigger: "blur",
                      },
                      expiration: {
                        type: "date",
                        required: true,
                        message: "Certification Date can not be empty",
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
                    <label>Name: </label>
                    <br/>
                    <div className="certification-drpdwn">
                    <Select
                      value={certification.name}
                      placeholder="Please select a certification"
                      onChange={(value) => this.onChange(index, "name", value)}
                    >
                      {this.props.certifications.map((c) => {
                        return (
                          <Select.Option
                            label={c}
                            value={c}
                            key={c}
                          ></Select.Option>
                        );
                      })}
                    </Select>
                    </div>
                    <label>Number: </label>
                    <Input
                      value={certification.number}
                      onChange={(value) =>
                        this.onChange(index, "number", value)
                      }
                    ></Input>
                    <label>Expiration Date: </label>
                    <br />
                    <DatePicker
                      value={certification.expiration}
                      placeholder="Pick a day"
                      onChange={(value) =>
                        this.onChange(index, "expiration", value)
                      }
                      disabledDate={(time) =>
                        time.getTime() < Date.now() - 8.64e7
                      }
                    />
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

export default CertificationsFormItem;
