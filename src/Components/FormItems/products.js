import React, { Component } from 'react';
import { Input, Form, Card } from 'element-react';
import MultiOptionCard from '../multiOptionCard';
import SingleOptionCard from '../singleOptionCard';


class ProductsFormItem extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)

        this.state = {
            products: [],
            count: 0,
            min: 0,
            max: 5
        }
    }

    onAdd() {
        this.state.products.push({
            value: ''
        })
        this.setState({
            ...this.state,
            count: this.state.count + 1
        })
        this.forceUpdate()
        this.props.onUpdate('products', this.state.products)
    }

    onDelete(index) {
        const productsList = this.state.products.filter((s, i) => i !== index)

        this.setState({
            ...this.state,
            products: productsList,
            count: this.state.count - 1
        })

        this.forceUpdate()
        this.props.onUpdate('products', productsList)
    }

    onChange(index, key, value) {
        this.state.products[index][key] = value
        this.forceUpdate()
        this.props.onUpdate('products', this.state.products)
    }

    render() {
        return (
            <MultiOptionCard title="List your Products" onAdd={this.onAdd} min={this.state.min} max={this.state.max} count={this.state.count}>
                {
                    this.state.products.map((product, index) => {
                        return (
                            <Card key={index}>
                                <Form.Item
                                    key={index}
                                    label={`Product ${index + 1}`}
                                    prop={`products:${index}`}
                                    rules={{
                                        type: 'object',
                                        fields: {
                                            value: { required: true, message: 'Product can not be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                    <SingleOptionCard onDelete={this.onDelete} index={index}>
                                        <Input value={product.value} onChange={(value) => this.onChange(index, 'value', value)}></Input>
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

export default ProductsFormItem; 
