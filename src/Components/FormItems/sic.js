import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class SicFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            sicCodes: [],
            count: 0,
            min: 1,
            max: 5
        }
    }

    onAdd() {
        this.state.sicCodes.push({
            value: ''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('sicCodes', this.state.sicCodes)
    }

    onDelete(index) {
        const sicCodesList = this.state.nsicCodes.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            naicsCodes: sicCodesList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('sicCodes', sicCodesList)
    }

    onChange(index, key, value) {
        this.state.sicCodes[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('sicCodes', this.state.sicCodes)
    }

    render() {
        return (
            <MultiOptionCard title="List your SIC Codes" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.sicCodes.map((sicCodes, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`SIC Codes ${index + 1}`}
                                    prop={`sicCodes:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            value: [{ required: true, message: 'SIC Code can not be empty', trigger: 'blur'} ,{ trigger: 'blur', validator: (rule, value, callback) => {
                                            var sicPattern = /^\d{12}$/
                                            if (!sicPattern.test(value)) {
                                            callback(new Error('SIC# error: Invalid SIC number. Please Enter 12 digit SIC number'));
                                            } else {
                                            callback();
                                            }}}]
                                        }
                                    }}
                                >
                                    <SingleOptionCard onDelete={this.onDelete} index={index}>
                                        <Input value={sicCodes.value} onChange={(value) => this.onChange(index, 'value', value)}></Input>
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

export default SicFormItem; 
