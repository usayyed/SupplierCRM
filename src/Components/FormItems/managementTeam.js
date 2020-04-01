import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class ManagementTeamFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            managementTeams: [],
            count: 0,
            min: 1,
            max: 5
        }
    }

    onAdd() {
        this.state.managementTeams.push({
            name: '',
            title:'',
            location:''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('managementTeams', this.state.managementTeams)
    }

    onDelete(index) {
        const managementTeamsList = this.state.managementTeams.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            managementTeams: managementTeamsList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('managementTeams', managementTeamsList)
    }

    onChange(index, key, value) {
        this.state.managementTeams[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('managementTeams', this.state.managementTeams)
    }

    render() {
        return (
            <MultiOptionCard title="List your Management Teams Details" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.managementTeams.map((managementTeams, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`Management Team ${index + 1}`}
                                    prop={`managementTeams:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            value: { required: true, message: 'Management Teams Details can not be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                    <SingleOptionCard onDelete={this.onDelete} index={index}>
                                        <label>Name: </label>
                                      <Input value={managementTeams.name} onChange={(value) => this.onChange(index, 'name', value)}></Input>
                                      <label>Title: </label>
                                      <Input value={managementTeams.title} onChange={(value) => this.onChange(index, 'title', value)}></Input>
                                      <label>Location: </label>
                                      <Input value={managementTeams.location} onChange={(value) => this.onChange(index, 'location', value)}></Input>
                                    
                                    </SingleOptionCard>
                                </Form.Item>
                            </Card>
                        )
                    })
                }
            </MultiOptionCard>
        )
    }

}

export default ManagementTeamFormItem; 
