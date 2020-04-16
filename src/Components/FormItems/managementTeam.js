import React, { Component } from "react";
import { Input, Form, Card, Button } from "element-react";
import MultiOptionCard from "../multiOptionCard";
import SingleOptionCard from "../singleOptionCard";

class ManagementTeamFormItem extends Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      managementTeams: [],
      count: 0,
      min: 1,
      max: 5,
    };
  }

  onAdd() {
    this.state.managementTeams.push({
      name: "",
      title: "",
    });
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
    this.forceUpdate();
    this.props.onUpdate("managementTeams", this.state.managementTeams);
  }

  onDelete(index) {
    const managementTeamsList = this.state.managementTeams.filter(
      (s, i) => i !== index
    );

    this.setState({
      ...this.state,
      managementTeams: managementTeamsList,
      count: this.state.count - 1,
    });

    this.forceUpdate();
    this.props.onUpdate("managementTeams", managementTeamsList);
  }

  onChange(index, key, value) {
    this.state.managementTeams[index][key] = value;
    this.forceUpdate();
    this.props.onUpdate("managementTeams", this.state.managementTeams);
  }

  render() {
    return (
        <div>
      <MultiOptionCard
        title="List your Management Teams Details"
        onAdd={this.onAdd}
        min={this.state.min}
        max={this.state.max}
        count={this.state.count}
      >
        {this.state.managementTeams.map((managementTeam, index) => {
          return (
            <Card key={index}>
              <Form.Item
                key={index}
                label={`Management Team ${index + 1}`}
                prop={`managementTeams:${index}`}
                rules={{
                  type: "object",
                  fields: {
                    name: {
                      required: true,
                      message: "Management team name can not be empty",
                      trigger: "blur",
                    },
                    title: {
                      required: true,
                      message: "Management team title can not be empty",
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
                  <label>* Name: </label>
                  <Input
                    value={managementTeam.name}
                    onChange={(value) => this.onChange(index, "name", value)}
                  ></Input>
                  <label>* Title: </label>
                  <Input
                    value={managementTeam.title}
                    onChange={(value) => this.onChange(index, "title", value)}
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

export default ManagementTeamFormItem;
