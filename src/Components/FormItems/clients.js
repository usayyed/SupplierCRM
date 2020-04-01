import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class ClientsFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            clients: [],
            count: 0,
            min: 0,
            max: 3
        }
    }

    onAdd() {
        this.state.clients.push({
            value: ''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('clients', this.state.clients)
    }

    onDelete(index) {
        const clientsList = this.state.clients.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            clients: clientsList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('clients', clientsList)
    }

    onChange(index, key, value) {
        this.state.clients[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('clients', this.state.clients)
    }

    render() {
        return (
            <MultiOptionCard title="List your Major Clients" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.clients.map((client, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`Major Client ${index + 1}`}
                                    prop={`client:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            value: { required: true, message: 'Service can not be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                <SingleOptionCard onDelete={this.onDelete} index={index} disabledDelete={this.state.count <= this.state.min}>
                                        <Input value={client.value} onChange={(value) => this.onChange(index, 'value', value)}></Input>
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

export default ClientsFormItem; 
