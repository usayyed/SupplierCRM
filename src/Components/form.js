import React, { Component } from 'react';
import {Input, Form, Button, Select} from 'element-react';
import MultiOptionCard from './multiOptionCard';


class SupplierForm extends Component {
    
    constructor(props) {
    super(props);
  
    this.state = {
      form: {
        name: '',
       address: '',
        city:'',
        companyState:'',
        postalCode:'',
        website:'',
        aboutCompany:'',
        duns:'',
        services: [],
      },
      rules: {
        name: [
          { required: true, message: 'Please input Company name', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'Please Input address', trigger: 'blur'}
        ],
        services: [
          { required: true, message: 'Please input Service name', trigger: 'blur' }
        ],
        city: [
            { required: true, message: 'Please Input city', trigger: 'blur'}
          ],
          companyState: [
            { required: true, message: 'Please Input State', trigger: 'blur'}
          ],
          postalCode: [
            { required: true, message: 'Please Input Postal Code', trigger: 'blur'}, { trigger: 'blur', validator: (rule, value, callback) => {
                var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/
                if (!zipCodePattern.test(value)) {
                  callback(new Error('Zipcode error: Invalid Zip Code. Please Enter in 12345 or 12345-1234.'));
                } else {
                  callback();
                }}
            }
          ],
          duns: [
            { required: true, message: 'Please Input DUNS', trigger: 'blur'}, { trigger: 'blur', validator: (rule, value, callback) => {
                var dunsPattern = /^\d{9}$/
                if (!dunsPattern.test(value)) {
                  callback(new Error('DUNS# error: Invalid DUNS number. Please Enter 9 digit DUNS number'));
                } else {
                  callback();
                }}
            }
          ],
          website: [
            { required: true, message: 'Please Input Website', trigger: 'blur'}, { trigger: 'blur', validator: (rule, value, callback) => {

                var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

                if (pattern.test(value)) {
                    callback();
                } else {
                  
                  callback(new Error('Website'));
                }}
            }
          ],
          aboutCompany: [
            { required: true, message: 'Please Input Company Description', trigger: 'blur'}
          ],
        
      }
    };
  }
  
  onSubmit(e) {
    e.preventDefault();

    this.refs.form.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  }
  
  onChange(key, value) {
    

    this.setState((state, props) => {
        return { ...state, 
            form: {
                ...state.form,
                [key]: value
            }

        };
    });
    console.log(this.state.form)
  }
  
// //   validateNonEmpty(key){
// //     if (this.state.form[key]==''){
// //         alert("Empty")
//     }
//   }
  render() {
    return (
      <Form ref="form" className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)} rules={this.state.rules} labelPosition="top">
  
  <Form.Item label="Company Name" prop='name'>
          <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} ></Input>
        </Form.Item>
    
        <Form.Item label="Headquarter Address" prop='address'>
          <Input type="textarea" value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
        </Form.Item>

        <Form.Item label="State">
        <Select value={this.state.form.companyState} placeholder="Please select your state">
          <Select.Option label="Zone 1" value="shanghai"></Select.Option>
          <Select.Option label="Zone 2" value="beijing"></Select.Option>
        </Select>
      </Form.Item>

        <Form.Item label="City">
        <Select value={this.state.form.city} placeholder="Please select your city">
          <Select.Option label="Zone 1" value="shanghai"></Select.Option>
          <Select.Option label="Zone 2" value="beijing"></Select.Option>
        </Select>
      </Form.Item>

        <Form.Item label="Postal Code" prop='postalCode'>
          <Input type="" value={this.state.form.postalCode} onChange={this.onChange.bind(this, 'postalCode')}></Input>
        </Form.Item>

        <Form.Item label="Website" prop='website'>
          <Input type="" value={this.state.form.website} onChange={this.onChange.bind(this, 'website')}></Input>
        </Form.Item>
        <Form.Item label="DUNS#" prop='duns'>
          <Input type="" value={this.state.form.duns} onChange={this.onChange.bind(this, 'duns')}></Input>
        </Form.Item>
        <Form.Item label="Company Description" prop='aboutCompany'>
          <Input type="textarea"  autosize={{ minRows: 4, maxRows: 6}}
      placeholder="About Your Company" value={this.state.form.aboutCompany} onChange={this.onChange.bind(this, 'aboutCompany')}></Input>
        </Form.Item>
        
        <MultiOptionCard title="List your Services">
            <Form.Item label="Service Name" prop='services'>
                <Input type="textarea" value={this.state.form.address} onChange={this.onChange.bind(this, 'address')}></Input>
            </Form.Item>
        </MultiOptionCard>
        

        <Form.Item>
          <Button type="primary" nativeType="submit">Create</Button>
          <Button>Cancel</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default SupplierForm; 