import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class PartnersFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            partners: [],
            count: 0,
            min: 0,
            max: 3
        }
    }

    onAdd() {
        this.state.partners.push({
            name: ''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('partners', this.state.partners)
    }

    onDelete(index) {
        const partnersList = this.state.partners.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            partners: partnersList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('partners', partnersList)
    }

    onChange(index, key, value) {
        this.state.partners[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('partners', this.state.partners)
    }

    render() {
        return (
            <MultiOptionCard title="List your Major Partners" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.partners.map((partner, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`Partners ${index + 1}`}
                                    prop={`partners:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            name: { required: true, message: 'Partners can not be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                <SingleOptionCard onDelete={this.onDelete} index={index} disabledDelete={this.state.count <= this.state.min}>
                                        <Input value={partner.name} onChange={(value) => this.onChange(index, 'name', value)}></Input>
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

export default PartnersFormItem; 
