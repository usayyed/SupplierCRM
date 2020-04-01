import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class CdwContactsFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            cdwContacts: [],
            count: 0,
            min: 0,
            max: 2
        }
    }

    onAdd() {
        this.state.cdwContacts.push({
            name: '',
            email:'',
            phone:''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('cdwContacts', this.state.cdwContacts)
    }

    onDelete(index) {
        const cdwContactsList = this.state.cdwContacts.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            cdwContacts: cdwContactsList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('cdwContacts', this.state.cdwContacts)
    }

    onChange(index, key, value) {
        this.state.cdwContacts[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('cdwContacts', this.state.cdwContacts)
    }

    render() {
        return (
            <MultiOptionCard title="List your Primary Contacts at CDW" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.cdwContacts.map((cdwContact, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`CDW Contact ${index + 1}`}
                                    prop={`cdwContacts:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            name: { required: true, message: 'Name can not be empty', trigger: 'blur' },
                                            email: { required: true, message: 'Email can not be empty', trigger: 'blur' },
                                            phone: { required: true, message: 'Phone number can not be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                    <SingleOptionCard onDelete={this.onDelete} index={index}>
                                      <label>Name: </label>
                                        <Input value={cdwContact.name} onChange={(value) => this.onChange(index, 'name', value)}></Input>
                                        <label>Email: </label>
                                        <Input value={cdwContact.email} onChange={(value) => this.onChange(index, 'email', value)}></Input>
                                        <label>Phone: </label>
                                        <Input value={cdwContact.phone} onChange={(value) => this.onChange(index, 'phone', value)}></Input>
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

export default CdwContactsFormItem; 
