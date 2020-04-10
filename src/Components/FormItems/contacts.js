/*eslint no-useless-escape: 0*/
import React, { Component } from "react";
import SupConFormItem from "./supCon";
import AdmContactFormItem from "./admCon";
import SalContactFormItem from "./salCon";

class ContactsFormItem extends Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      supplierContact: [{
        name: "",
        email: "",
        phone: "",
      }],
      administrativeContact: [{
        name: "",
        email: "",
        phone: "",
      }],
      salesContact: [{
        name: "",
        email: "",
        phone: "",
      }],
    };

    this.updateAll();
  }

  updateAll() {
    this.forceUpdate();
    this.props.onUpdate("salesContact", this.state.salesContact);
    this.props.onUpdate("administrativeContact", this.state.administrativeContact);
    this.props.onUpdate("supplierContact", this.state.supplierContact);
  }

  onChange(key, value) {
    this.state[key] = value;
    this.updateAll();
  }

  onCopy(from, to) {
      this.state[to] = JSON.parse(JSON.stringify(this.state[from]));
      this.updateAll();
  }

  render() {
    return (
      <div>
        <SupConFormItem onUpdate={this.onChange} data={this.state.supplierContact}> </SupConFormItem>
        <AdmContactFormItem onUpdate={this.onChange} onCopy={this.onCopy} data={this.state.administrativeContact}> </AdmContactFormItem>
        <SalContactFormItem onUpdate={this.onChange} onCopy={this.onCopy} data={this.state.salesContact}> </SalContactFormItem>
      </div>
    );
  }
}

export default ContactsFormItem;
