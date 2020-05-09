import React, { Component } from "react";
import { Card, Loading, Button } from "element-react";
import axios from "../Middleware/Axios";
import config from "../config";
import { withRouter } from "react-router-dom";
import moment from "moment";

class Supplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: {
        text: "",
        value: false,
      },
      data: {
        services: [],
        managementTeams: [],
        products: [],
        services: [],
        awards: [],
        clients: [],
        partners: [],
        certifications: [],
        naicsCodes: [],
        sicCodes: [],
        administrativeContact: [],
        salesContact: [],
        supplierContact: [],
        cdwContacts: [],
      },
    };
  }

  changeLoadingState(value, text) {
    this.state.loading.value = value;
    this.state.loading.text = text;
    this.forceUpdate();
  }

  onClick() {
    this.props.history.push("/supplier-list");
  }

  componentDidMount() {
    this.changeLoadingState(true, "Loading supplier details...");
    axios
      .get(`/admin/getSupplier/${this.props.match.params.supplierID}`)
      .then((res) => {
        if (res.status !== 201 && res.status !== 200) {
          throw new Error(
            "Some error occurred. Please contact the administrator"
          );
        }

        console.log(res.data.data.services);
        this.setState((state, props) => {
          return { ...state, data: res.data.data };
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => this.changeLoadingState(false, ""));
  }

  render() {
    return (
      <Loading
        loading={this.state.loading.value}
        text={this.state.loading.text}
      >
        <div className="supplier-header">
          <div className="supplier-header-left">
            <div className="supplier-image">
              <img src={this.state.data.image} alt="Red dot" />
            </div>
            <div className="supplier-header-name">
              <h1> {this.state.data.name} </h1>
            </div>
          </div>
          <div className="supplier-header-right">
            <Button
              type="primary"
              icon="caret-left"
              onClick={() => this.onClick()}
            >
              Go back
            </Button>
          </div>
        </div>

        <div className="supplier-container">
          <div className="supplier-container-left">
            <Card className="box-card">
              <h2> About us: </h2>
              <p> {this.state.data.description} </p>
            </Card>

            {this.state.data.managementTeams.length > 0 ||
            this.state.data.cdwContacts.length > 0 ? (
              <div className="supplier-row">
                {this.state.data.managementTeams.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Management Teams: </h2>
                      {this.state.data.managementTeams.map((o, i) => {
                        return (
                          <div className="supplier-row">
                            <div className="supplier-col">
                              <b>Name:</b> {o.name}
                            </div>
                            <div className="supplier-col">
                              <b>Title:</b> {o.title}
                            </div>
                          </div>
                        );
                      })}
                    </Card>
                  </div>
                ) : null}
                {this.state.data.cdwContacts.length > 0 ? (
                  <div className="supplier-col">
                  <Card className="box-card">
                <h2> CDW Contacts: </h2>
                {this.state.data.cdwContacts.map((o, i) => {
                  return (
                    <div className="supplier-row">
                      <div className="supplier-col">
                        <b>Name:</b> {o.name}
                      </div>
                      <div className="supplier-col">
                        <b>Contact Number: </b>{" "}
                        <a href={"tel:" + o.phone}>{o.phone}</a>
                      </div>
                      <div className="supplier-col">
                        <b>Email: </b>
                        <a href={"mailto:" + o.email.toLowerCase()}>
                          {o.email.toLowerCase()}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </Card>
                  </div>
                ) : null}
              </div>
            ) : null}

            {this.state.data.products.length > 0 ||
            this.state.data.services.length > 0 ? (
              <div className="supplier-row">
                {this.state.data.products.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Products: </h2>
                      <ul>
                        {this.state.data.products.map((o, i) => {
                          return <li key={i}>{o.value}</li>;
                        })}
                      </ul>
                    </Card>
                  </div>
                ) : null}
                {this.state.data.services.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Services: </h2>
                      <ul>
                        {this.state.data.services.map((o, i) => {
                          return <li key={i}>{o.name}</li>;
                        })}
                      </ul>
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : null}

            {this.state.data.awards.length > 0 ||
            this.state.data.clients.length > 0 ||
            this.state.data.partners.length > 0 ? (
              <div className="supplier-row">
                {this.state.data.awards.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Awards: </h2>
                      <ul>
                        {this.state.data.awards.map((o, i) => {
                          return <li key={i}>{o.value}</li>;
                        })}
                      </ul>
                    </Card>
                  </div>
                ) : null}
                {this.state.data.clients.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Clients: </h2>
                      <ul>
                        {this.state.data.clients.map((o, i) => {
                          return <li key={i}>{o.name}</li>;
                        })}
                      </ul>
                    </Card>
                  </div>
                ) : null}
                {this.state.data.partners.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Partners: </h2>
                      <ul>
                        {this.state.data.partners.map((o, i) => {
                          return <li key={i}>{o.name}</li>;
                        })}
                      </ul>
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : null}

            {this.state.data.administrativeContact.length > 0 ||
            this.state.data.salesContact.length > 0 ||
            this.state.data.supplierContact.length > 0 ? (
              <div className="supplier-row">
                {this.state.data.administrativeContact.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Administrative Contact: </h2>
                      {this.state.data.administrativeContact.map((o, i) => {
                        return (
                          <div>
                            <b>Name: </b> {o.name}
                            <br />
                            <b>Contact Number: </b>{" "}
                            <a href={"tel:" + o.phone}>{o.phone}</a>
                            <br />
                            <b>Email: </b>
                            <a href={"mailto:" + o.email.toLowerCase()}>
                              {o.email.toLowerCase()}
                            </a>
                            <br />
                          </div>
                        );
                      })}
                    </Card>
                  </div>
                ) : null}
                {this.state.data.salesContact.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Sales Contact: </h2>
                      {this.state.data.salesContact.map((o, i) => {
                        return (
                          <div>
                            <b>Name: </b> {o.name}
                            <br />
                            <b>Contact Number: </b>{" "}
                            <a href={"tel:" + o.phone}>{o.phone}</a>
                            <br />
                            <b>Email: </b>
                            <a href={"mailto:" + o.email.toLowerCase()}>
                              {o.email.toLowerCase()}
                            </a>
                            <br />
                          </div>
                        );
                      })}
                    </Card>
                  </div>
                ) : null}
                {this.state.data.supplierContact.length > 0 ? (
                  <div className="supplier-col">
                    <Card className="box-card">
                      <h2> Supplier Contact: </h2>
                      {this.state.data.supplierContact.map((o, i) => {
                        return (
                          <div>
                            <b>Name: </b> {o.name}
                            <br />
                            <b>Contact Number: </b>{" "}
                            <a href={"tel:" + o.phone}>{o.phone}</a>
                            <br />
                            <b>Email: </b>
                            <a href={"mailto:" + o.email.toLowerCase()}>
                              {o.email.toLowerCase()}
                            </a>
                            <br />
                          </div>
                        );
                      })}
                    </Card>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="supplier-row">
              {this.state.data.naicsCodes.length > 0 ? (
                <div className="supplier-col">
                  <Card className="box-card">
                    <h2> NAICS Codes: </h2>
                    <ul>
                      {this.state.data.naicsCodes.map((o, i) => {
                        return <li key={i}>{o.value}</li>;
                      })}
                    </ul>
                  </Card>
                </div>
              ) : null}
              {this.state.data.sicCodes.length > 0 ? (
                <div className="supplier-col">
                  <Card className="box-card">
                    <h2> SIC Codes: </h2>
                    <ul>
                      {this.state.data.sicCodes.map((o, i) => {
                        return <li key={i}>{o.value}</li>;
                      })}
                    </ul>
                  </Card>
                </div>
              ) : null}

              <div className="supplier-col">
                <Card className="box-card">
                  <h2> DUNS #: {this.state.data.duns}</h2>
                </Card>
              </div>
            </div>

            {this.state.data.certifications.length > 0 ? (
              <Card className="box-card">
                <h2> Certifications: </h2>
                {this.state.data.certifications.map((o, i) => {
                  return (
                    <div className="supplier-row">
                      <div className="supplier-col">
                        <b>Name:</b> {o.name}
                      </div>
                      <div className="supplier-col">
                        <b>Number:</b> {o.number}
                      </div>
                      <div className="supplier-col">
                        <b>Expiration:</b>{" "}
                        {moment(o.expiration).format("MMMM Do YYYY")}
                      </div>
                    </div>
                  );
                })}
              </Card>
            ) : null}
          </div>
          <div className="supplier-container-right">
            <Card>
              <div className="supplier-header">
                <h1>{this.state.data.name} </h1>
              </div>
            </Card>
          </div>
        </div>

        <Card className="box-card">
          <h2> Company Details: </h2>
          <b> Name: </b> {this.state.data.name}
          <br />
          <b> Address: </b>
          {this.state.data.address}
          <br />
          <b> State: </b>
          {this.state.data.state}
          <br />
          <b> City: </b>
          {this.state.data.city}
          <br />
          <b> Zip Code: </b>
          {this.state.data.postalCode}
          <br />
          <b> Website: </b>{" "}
          <a href={this.state.data.website}>{this.state.data.website}</a>
          <br />
        </Card>
      </Loading>
    );
  }
}

export default withRouter(Supplier);
