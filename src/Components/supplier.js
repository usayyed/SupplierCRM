import React, { Component } from "react";
import { Card } from "element-react";
import axios from "../Middleware/Axios";
import config from "../config";
import { withRouter } from "react-router-dom";
import moment from 'moment';

class Supplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        services: [],
        managementTeams: [],
        products: [],
        services: [],
        awards: [],
        clients: [],
        partners: [],
        certifications: [],
      },
      name: "DoddiTech",
      description:
        " Our Talent care fully screen and select the best talent. jnvdlvls" +
        "zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd." +
        "zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd." +
        "zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd." +
        "zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd." +
        "zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd.",

      services: [
        {
          name: "Consulting Services",
          value:
            " Provider of Carefully Screened Top Notch IT Talent in Software.",
        },
        {
          name: "Cyber Security",
          value: " Expert in Risk Assesment and Threat Prevention",
        },
        {
          name: "Software Development",
          value:
            " Experienced in Enterprise application Development using latest Technology.",
        },
        {
          name: "Project Re-engineering",
          value: " Provide Clear Road map for Legacy.",
        },
        {
          name: "Big Data",
          value:
            " Data Analytics, Predictive Analytics and Business Intelligence.",
        },
      ],
      certifications: [
        "Minority Business Enterprise (MBE) City of New York",
        "Disadvantaged Business Enterprise (DBE) Federal -USDOT",
        "NYC Vendor#: VC00135345",
        "NYS Vendor#: 100155897",
      ],
      contact: {
        name: "Satya N. Doddi",
        designation: "MBA, MA President & CEO",
        email: "satya.doddi@dodditech.com",
        website: "https://www.Dodditech.com",
        contactno: "+1-(646)-3305354",
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        `${config.apiGateway.BASE_URL}/admin/getSupplier/${this.props.match.params.supplierID}`
      )
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
      });
  }

  render() {
    return (
      <div>
        <div className="supplier-header">
          <div className="supplier-image">
            <img src={this.state.data.image} alt="Red dot" />
          </div>
          <h1> {this.state.data.name} </h1>
        </div>

        <div className="supplier-container">
          <div className="supplier-container-left">
            <Card className="box-card">
              <h2> About us: </h2>
              <p> {this.state.data.description} </p>
            </Card>
            {this.state.data.services.length > 0 ? (
              <Card className="box-card">
                <h2> Services: </h2>
                <ul>
                  {this.state.data.services.map((o, i) => {
                    return <li key={i}>{o.name}</li>;
                  })}
                </ul>
              </Card>
            ) : null}

            {this.state.data.managementTeams.length > 0 ? (
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
            this.state.data.clients.length > 0|| this.state.data.partners.length > 0 ? (
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
                        <b>Expiration:</b> {moment(o.expiration).format('MMMM Do YYYY, h:mm:ss a')}
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
                <h1> {this.state.data.name} </h1>
              </div>
            </Card>
          </div>
        </div>

        <Card className="box-card">
          <h2> Contact Details: </h2>
          <b> Name: </b> {this.state.contact.name}
          <br />
          <b>Designation: </b>
          {this.state.contact.designation}
          <br />
          <b> Email: </b>
          <a href={"mailto:" + this.state.contact.email}>
            {this.state.contact.email}
          </a>
          <br />
          <b> Website: </b>{" "}
          <a href={this.state.contact.website}>{this.state.contact.website}</a>
          <br />
          <b>Contact Number: </b>{" "}
          <a href={"tel:" + this.state.contact.contactno}>
            {this.state.contact.contactno}
          </a>
        </Card>
      </div>
    );
  }
}

export default withRouter(Supplier);
