import React, { Component } from 'react';
import { Table, Input, Button } from 'element-react';
import { withRouter } from 'react-router-dom';

class TableComponent extends Component {

    onChange(searchTerm)
    {
        const fData = this.state.data.filter((o) => {
            return Object.values(o).some((val) => val.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        });

        this.setState((state, props) => {
            return {...state, filteredData: fData};
        });
    }

    onClick(e, id)
    {
      this.props.history.push('/supplier/' + id)
    }

    constructor(props) {
        super(props);
     
        this.state = {
          columns: [
            {
              label: "Tittle",
              prop: "tittle",
              sortable: true
            },
            {
              label: "Certifications",
              prop: "certifications",
             
            },
            {
              label: "Services",
              prop: "services",
              
            },
            {
                label: "Location",
                prop: "location",
              },
              {
                label:"Link",
                render: (row, column, index)=>{
                  return <span><Button type="primary" icon="information" size="small" onClick={(e) => this.onClick(e, row.id)}></Button></span>
                }
              }
          ],
          data: [{
            id:'1',
            tittle: 'DoddiTech',
            certifications: 'MBE, SBE, DBE',
            services: 'Consulting services, Cyber Security, Software Development, Project Re-engineering, Big Data',
            location:'CA'
          }, {
            id:'2',
            tittle: 'Tech World',
            certifications: 'MBE, DBE, SBE',
            services: 'Consulting services, Cyber Security, Project Re-engineering, Big Data',
            location:'NY'
          }, {
            id:'3',
            tittle: 'StartUI',
            certifications: 'DBE, NYC vendor, SBE',
            services: 'Consulting services, Cyber Security, Big Data',
            location:'MA'
          }, {
            id:'4',
            tittle: 'DevelopersHub',
            certifications: 'PSC, NYGP',
            services: 'Software Development, Project Re-engineering, Big Data',
            location:'CA'
          }],
          filteredData: [],
        }
      }
      
      render() {
     
        return  (
            <div>
              <div className="search">
                <div></div>
                <Input placeholder="Search" onChange={this.onChange.bind(this)}  icon="search"/>
              </div>
            
           
              <Table
                rowKey={(row) => row.id}
                columns={this.state.columns}
                data={this.state.filteredData} />
                {/* <Pagination layout="prev, pager, next" total={50} small={true}/> */}
            
          </div>
          
        )
      }

      componentDidMount() {
        this.setState((state, props) => {
            return {...state, filteredData: state.data};
        });
      }
}

export default withRouter(TableComponent); 