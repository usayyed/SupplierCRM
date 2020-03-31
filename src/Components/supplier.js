import React, { Component } from 'react';
import {Card} from 'element-react';

class Supplier extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            name: "DoddiTech",
            description: " Our Talent care fully screen and select the best talent. jnvdlvls"
              +"zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd."
              +"zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd."
              +"zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd."
              +"zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd."
              +"zcvsv klmclsmcl knlnsldnls lilnn. inlsnlnlnlondl nkjnknk sdfseidfse.efnsnfsd.",

            services: [
                {
                    name: "Consulting Services",
                    value: " Provider of Carefully Screened Top Notch IT Talent in Software.",
                }, {
                    name: "Cyber Security",
                    value: " Expert in Risk Assesment and Threat Prevention",
                }, {
                    name: "Software Development",
                    value: " Experienced in Enterprise application Development using latest Technology.",
                },
                {
                name: "Project Re-engineering",
                value: " Provide Clear Road map for Legacy.",
            },
            {
                name: "Big Data",
                value: " Data Analytics, Predictive Analytics and Business Intelligence.",
            }
            ],
            certifications: [
                "Minority Business Enterprise (MBE) City of New York",
                "Disadvantaged Business Enterprise (DBE) Federal -USDOT",
                "NYC Vendor#: VC00135345",
                "NYS Vendor#: 100155897"
            ],
            contact: {
                name:"Satya N. Doddi",
                designation:"MBA, MA President & CEO",
                email:"satya.doddi@dodditech.com",
                website:"https://www.Dodditech.com",
                contactno:"+1-(646)-3305354"
            }

        }
    }
    
      render() {
        return (
           <div>
               <div className="supplier-header">
                    <h1>  {this.state.name} </h1>
                </div>
             

             <div className="supplier-container">
                 <div className="supplier-container-left">
             <Card className="box-card">
                 <h2> About us: </h2> 
            <p>  {this.state.description} </p>
         </Card>
         <Card className="box-card">
                 <h2> Services: </h2> 
                <ul>
                    {
                        this.state.services.map((o, i) => {
                            return <li key={i}><b>{o.name}</b>: {o.value}</li>
                        })
                    }
                </ul>
         </Card>

         <Card className="box-card">
                 <h2> Certifications: </h2> 
                <ul>
             {
                 this.state.certifications.map(function(certication, i){
                     return <li key={i}> {certication} </li>
                 })
             }
                </ul>
         </Card>
         </div>
         <div className="supplier-container-right">
             <Card>
             <h1>  {this.state.name} </h1>
             </Card>
         </div>
         </div>

         <Card className="box-card">
                 <h2> Contact Details: </h2> 
               
            <b> Name: </b> {this.state.contact.name}
             <br/>
             <b>Designation: </b>{this.state.contact.designation}
             <br/>
           <b> Email: </b><a href={"mailto:" + this.state.contact.email}>{this.state.contact.email}</a> 
             <br/>
            <b> Website: </b> <a href={this.state.contact.website}>{this.state.contact.website}</a><br/>
            <b>Contact Number: </b> <a href={"tel:" + this.state.contact.contactno}>{this.state.contact.contactno}</a> 
               
         </Card>

     </div>
        );
      }
}

export default Supplier; 