import React, { Component } from 'react';
import { Input, Form, Card, Button } from 'element-react';
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
            <div>
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
                                            value: { required: true, message: 'Products can not be empty', trigger: 'blur' }
                                        }
                                    }}
                                >
                                <SingleOptionCard onDelete={this.onDelete} index={index} disabledDelete={this.state.count <= this.state.min}>
                                        <Input value={product.value} onChange={(value) => this.onChange(index, 'value', value)}></Input>
                                    </SingleOptionCard>
                                </Form.Item>
                            </Card>
                        )
                    })
                }
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
        )
    }

}

export default ProductsFormItem; 
