import React, { Component } from "react";
import {
  Table,
  Input,
  Button,
  Select,
  Pagination,
  Loading,
} from "element-react";
import { withRouter } from "react-router-dom";
import axios from "../Middleware/Axios";
import config from "../config";

class TableComponent extends Component {
  onChange(searchTerm) {
    this.onUpdate("request", "searchTerm", searchTerm);
  }

  onUpdate(term, key, value) {
    this.setState((state, props) => {
      return {
        ...state,
        [term]: {
          ...state[term],
          [key]: value,
        },
      };
    });

    console.log(this.state);
    this.forceUpdate();
  }

  onClick(e, id) {
    this.props.history.push("/supplier/" + id);
  }

  changeLoadingState(value, text) {
    this.state.loading.value = value;
    this.state.loading.text = text;
    this.forceUpdate();
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: {
        text: "",
        value: false,
      },
      columns: [
        {
          label: "Company Name",
          prop: "name",
          sortable: true,
        },
        {
          label: "City",
          prop: "city",
        },
        {
          label: "State",
          prop: "state",
        },
        {
          label: "Certifications",
          prop: "certifications",
        },
        {
          label: "Products",
          prop: "products",
        },
        {
          label: "Services",
          prop: "services",
        },
        {
          label: "Link",
          width: "75px",
          render: (row, column, index) => {
            return (
              <span>
                <Button
                  type="primary"
                  icon="information"
                  size="small"
                  onClick={(e) => this.onClick(e, row.id)}
                ></Button>
              </span>
            );
          },
        },
      ],
      data: [],
      request: {
        pageSize: 10,
        pageNumber: 1,
        searchField: "name",
        searchTerm: "",
        orderBy: [],
      },
      count: 0,
    };
  }

  render() {
    return (
      <Loading
        loading={this.state.loading.value}
        text={this.state.loading.text}
      >
      
        <div className="search-bar">
          <div className="search-input">
            <Input
              placeholder="Search database"
              onChange={this.onChange.bind(this)}
            />
            <div className="search-btn">
              <Button
                type="primary"
                icon="search"
                onClick={this.request.bind(this)}
              >
                {" "}
                Search
              </Button>
            </div>
          </div>
          <div className="search-dropdown">
            <label>Search by &nbsp;</label>
            <Select
              value={this.state.request.searchField}
              onChange={(val) => this.onUpdate("request", "searchField", val)}
            >
              {this.state.columns
                .filter((el) => el.label !== "Link")
                .map((el) => {
                  return (
                    <Select.Option
                      key={el.prop}
                      label={el.label}
                      value={el.prop}
                    />
                  );
                })}
            </Select>
          </div>
        </div>
        <br />
        <div className="supplier-table">
        <Table
          stripe={true}
          rowKey={(row) => row.id}
          columns={this.state.columns}
          data={this.state.data}
        />
        <br/>
        <Pagination
          layout="prev, pager, next"
          total={this.state.count}
          small={true}
          pageSize={this.state.request.pageSize}
          onCurrentChange={(v) => this.onPageChange(v)}
        />
        </div>
      </Loading>
    );
  }

  onPageChange(val) {
    this.onUpdate("request", "pageNumber", val);
    this.forceUpdate();
    this.request();
  }

  request() {
    this.changeLoadingState(true, "Loading data...");
    axios
      .post(
        `${config.apiGateway.BASE_URL}/admin/getSuppliers`,
        this.state.request
      )
      .then((res) => {
        if (res.status !== 201 && res.status !== 200) {
          throw new Error(
            "Some error occurred. Please contact the administrator"
          );
        }

        this.setState((state, props) => {
          return { ...state, data: res.data.data, count: res.data.count };
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => this.changeLoadingState(false, ""));;
  }

  componentDidMount() {
    this.request();
  }
}

export default withRouter(TableComponent);
