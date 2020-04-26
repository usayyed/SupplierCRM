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

  onSearch() {
    this.onUpdate("request", "pageNumber", 1);
    const body = {...this.state.request};
    body.pageNumber = 1;
    this.request(body);
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
      count: 100,
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
                onClick={() => this.onSearch()}
              >
                {" "}
                Search
              </Button>
            </div>
          </div>
          <div className="table-count">
          <label>Total Count: &nbsp; {this.state.count}</label>
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
          pageSize={this.state.request.pageSize}
          small={true}
          onCurrentChange={(v) => this.onPageChange(v)}
        />
        </div>
      </Loading>
    );
  }

  onPageChange(val) {
    const body = { ...this.state.request };
    body.pageNumber = val;
    this.onUpdate("request", "pageNumber", val);
    this.forceUpdate();
    this.request(body);
  }

  request(body) {
    this.changeLoadingState(true, "Loading data...");
    axios
      .post(
        `${config.apiGateway.BASE_URL}/admin/getSuppliers`,
        body
      )
      .then((res) => {
        if (res.status !== 201 && res.status !== 200) {
          throw new Error(
            "Some error occurred. Please contact the administrator"
          );
        }

        this.setState((state, props) => {
          return { ...state, data: res.data.data, count: Number.parseInt(res.data.count) };
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => this.changeLoadingState(false, ""));
  }

  componentWillMount() {
    this.request(this.state.request);
  }
}

export default withRouter(TableComponent);
