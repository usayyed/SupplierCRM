import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class AwardsFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            awards: [],
            count: 0,
            min: 0,
            max: 3
        }
    }

    onAdd() {
        this.state.awards.push({
            value: ''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('awards', this.state.awards)
    }

    onDelete(index) {
        const awardsList = this.state.awards.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            awards: awardsList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('awards', awardsList)
    }

    onChange(index, key, value) {
        this.state.awards[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('awards', this.state.awards)
    }

    render() {
        return (
            <MultiOptionCard title="List your Awards" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.awards.map((award, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`Awards ${index + 1}`}
                                    prop={`award:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            value: { required: true, message: 'awards can be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                    <SingleOptionCard onDelete={this.onDelete} index={index}>
                                        <Input value={award.value} onChange={(value) => this.onChange(index, 'value', value)}></Input>
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

export default AwardsFormItem; 
