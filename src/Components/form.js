import React, { Component } from "react";
import { Input, Form, Button, Loading, Upload, MessageBox } from "element-react";
import ServicesFormItem from "./FormItems/services";
import ProductFormItem from "./FormItems/products";
import CdwContactsFormItem from "./FormItems/cdwContacts";
import NaicsFormItem from "./FormItems/naics";
import SicFormItem from "./FormItems/sic";
import PartnersFormItem from "./FormItems/partners";
import ClientsFormItem from "./FormItems/clients";
import AwardsFormItem from "./FormItems/awards";
import CertificationsFormItem from "./FormItems/certifications";
import ContactsFormItem from "./FormItems/contacts";
import config from "../config";

class SupplierForm extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {
      loading: {
        text: "",
        value: false
      },
      form: {
        name: "",
        image: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        website: "",
        description: "",
        duns: "",
        services: [],
        cdwContacts: [],
        products: [],
        awards: [],
        certifications: [],
        clients: [],
        naicsCodes: [],
        managementTeams: [],
        partners: [],
        sicCodes: [],
        supplierContact: [],
        administrativeContact: [],
        salesContact: []
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Company name",
            trigger: "blur"
          }
        ],
        image: [
          {
            required: true,
            message: "Please upload Company logo",
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "Please Input address", trigger: "blur" }
        ],
        city: [
          { required: true, message: "Please Input City", trigger: "blur" }
        ],
        state: [
          { required: true, message: "Please Input State", trigger: "blur" }
        ],
        postalCode: [
          {
            required: true,
            message: "Please Input Postal Code",
            trigger: "blur"
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
              if (!zipCodePattern.test(value)) {
                callback(
                  new Error(
                    "Zipcode error: Invalid Zip Code. Please Enter in 12345 or 12345-1234."
                  )
                );
              } else {
                callback();
              }
            }
          }
        ],
        duns: [
          { required: true, message: "Please Input DUNS", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var dunsPattern = /^\d{9}$/;
              if (!dunsPattern.test(value)) {
                callback(
                  new Error(
                    "DUNS# error: Invalid DUNS number. Please Enter 9 digit DUNS number"
                  )
                );
              } else {
                callback();
              }
            }
          }
        ],
        website: [
          { required: true, message: "Please Input Website", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var pattern = new RegExp(
                "^(https?:\\/\\/)?" + // protocol
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                  "(\\#[-a-z\\d_]*)?$",
                "i"
              ); // fragment locator

              if (pattern.test(value)) {
                callback();
              } else {
                callback(new Error("Website"));
              }
            }
          }
        ],
        description: [
          {
            required: true,
            message: "Please Input Company Description",
            trigger: "blur"
          }
        ]
      }
    };

  }

  handleReset(e) {
    e.preventDefault();
    this.refs.form.resetFields();
  }

  submitData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.form)
    };
    this.changeLoadingState(true, "Submitting form data...");
    fetch(`${config.apiGateway.BASE_URL}/submitForm`, requestOptions)
      .then(() => {
        MessageBox.msgbox({
          title: 'Success',
          message: 'Your details have been successfully saved. Thank you for your time.',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
        this.refs.form.resetFields();
      })
      .catch(err => {
        MessageBox.msgbox({
          title: 'Failed',
          message: 'Some error occurred. Please contact the administrator',
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
      })
      .finally(() => this.changeLoadingState(false, "Submitting form data..."));
  }

  changeLoadingState(value, text) {
    this.state.loading.value = value;
    this.state.loading.text = text;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
    this.refs.form.validate(valid => {
      if (valid) {
        this.submitData();
      } else {
        MessageBox.msgbox({
          title: 'Failed',
          message: 'Form incomplete. Please fill in all the required details.',
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
        return false;
      }
    });
  }

  onChange(key, value) {
    this.setState((state, props) => {
      return {
        ...state,
        form: {
          ...state.form,
          [key]: value
        }
      };
    });

    this.forceUpdate();
  }

  processImage(e) {
    const imageUploadPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.file);
      reader.onload = (readerEvent) => {
        var image = new Image();
        image.onload = function() {
          // Resize the image
          var canvas = document.createElement("canvas"),
          width = 150,
          height = 150;
          

          if (canvas.width < 100 || canvas.height < 100) {
            reject(new Error("Incorrect image dimensions"))
          }

          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(image, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg"))
        };
        image.src = readerEvent.target.result;

        image.onerror = () => {
          reject(new Error("Error parsing image"));
        };
      };
      reader.onerror = () => {
        reader.abort();
        reject(new Error("Error parsing file"));
      };
    });

    imageUploadPromise
      .then(data => {
        this.changeLoadingState(true, "Uploading image...");
        this.onChange("image", data);
      })
      .catch(err => {
        MessageBox.msgbox({
          title: 'Failed',
          message: "Incorrect image dimensions",
          type: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
      })
      .finally(() => this.changeLoadingState(false, "Submitting form data..."));
  }

  render() {
    return (
      <Loading
        loading={this.state.loading.value}
        text={this.state.loading.text}
      >
        <Form
          ref="form"
          className="en-US"
          model={this.state.form}
          labelWidth="120"
          onSubmit={this.onSubmit.bind(this)}
          rules={this.state.rules}
          labelPosition="top"
        >
          <Form.Item label="Company Name" prop="name">
            <Input
              value={this.state.form.name}
              onChange={this.onChange.bind(this, "name")}
            ></Input>
          </Form.Item>

          <Form.Item label="Company Logo" prop="image">
            <Upload
              className="upload"
              httpRequest={e => this.processImage(e)}
              showFileList={false}
              tip={
                <div className="el-upload__tip">
                  jpg/png files with a size greater than 100px (width and height)
                </div>
              }
            >
              <Button size="small" type="primary">
                Click to upload
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Headquarter Address" prop="address">
            <Input
              type="textarea"
              value={this.state.form.address}
              onChange={this.onChange.bind(this, "address")}
            ></Input>
          </Form.Item>

          <Form.Item label="State" prop="state">
            <Input
              type="text"
              value={this.state.form.state}
              onChange={this.onChange.bind(this, "state")}
            ></Input>
          </Form.Item>

          <Form.Item label="City" prop="city">
            <Input
              type="text"
              value={this.state.form.city}
              onChange={this.onChange.bind(this, "city")}
            ></Input>
          </Form.Item>

          <Form.Item label="Postal Code" prop="postalCode">
            <Input
              type=""
              value={this.state.form.postalCode}
              onChange={this.onChange.bind(this, "postalCode")}
            ></Input>
          </Form.Item>

          <Form.Item label="Website" prop="website">
            <Input
              type=""
              value={this.state.form.website}
              onChange={this.onChange.bind(this, "website")}
            ></Input>
          </Form.Item>
          <Form.Item label="DUNS#" prop="duns">
            <Input
              type=""
              value={this.state.form.duns}
              onChange={this.onChange.bind(this, "duns")}
            ></Input>
          </Form.Item>
          <Form.Item label="Company Description" prop="description">
            <Input
              type="textarea"
              autosize={{ minRows: 4, maxRows: 6 }}
              placeholder="About Your Company"
              value={this.state.form.description}
              onChange={this.onChange.bind(this, "description")}
            ></Input>
          </Form.Item>

          <ServicesFormItem onUpdate={this.onChange}></ServicesFormItem>
          <ProductFormItem onUpdate={this.onChange}> </ProductFormItem>
          <ContactsFormItem onUpdate={this.onChange}> </ContactsFormItem>
          <CdwContactsFormItem onUpdate={this.onChange}> </CdwContactsFormItem>
          <NaicsFormItem onUpdate={this.onChange}> </NaicsFormItem>
          <SicFormItem onUpdate={this.onChange}> </SicFormItem>
          <ClientsFormItem onUpdate={this.onChange}> </ClientsFormItem>
          <PartnersFormItem onUpdate={this.onChange}> </PartnersFormItem>
          <AwardsFormItem onUpdate={this.onChange}> </AwardsFormItem>

          <CertificationsFormItem
            onUpdate={this.onChange}
          ></CertificationsFormItem>
          <Form.Item>
            <Button type="primary" nativeType="submit">
              Create
            </Button>
            <Button onClick={this.handleReset.bind(this)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Loading>
    );
  }
}

export default SupplierForm;
