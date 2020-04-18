import React, { Component } from "react";
import { Input, Form, Button, Loading, MessageBox } from "element-react";
import config from "../config";
import LocalStorageService from "../Middleware/LocalStorageService";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {
      loading: {
        text: "",
        value: false,
      },
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please input user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
            trigger: "blur,changes",
          },
        ],
      },
    };
  }

  handleReset(e) {
    e.preventDefault();
    this.refs.form.resetFields();
    this.onChange("username", "");
    this.onChange("password", "");
  }

  submitData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.form),
    };
    this.changeLoadingState(true, "Logging in...");
    fetch(`${config.apiGateway.BASE_URL}/login`, requestOptions)
      .then((res) => {
        if (!res.ok && res.status === 400) {
          throw new Error(
            "Some error occurred. Please contact the administrator"
          );
        }

        if (res.status === 401) {
          throw new Error("Invalid username or password");
        }

        return res.json();
      })
      .then((data) => {
        LocalStorageService.getService().setCredentials(data);
      })
      .catch((err) => {
        MessageBox.msgbox({
          title: "Failed",
          message: err.message,
          type: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      })
      .finally(() => this.changeLoadingState(false, "..."));
  }

  changeLoadingState(value, text) {
    this.state.loading.value = value;
    this.state.loading.text = text;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
    this.refs.form.validate((valid) => {
      if (valid) {
        this.submitData();
      } else {
        MessageBox.msgbox({
          title: "Failed",
          message: "Form incomplete. Please fill in all the required details.",
          type: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
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
          [key]: value,
        },
      };
    });

    this.forceUpdate();
  }

  render() {
    return (
      <Loading
        loading={this.state.loading.value}
        text={this.state.loading.text}
      >
        <h1 className="form-header">Administrator Login</h1>
        <br></br>
        <Form
          ref="form"
          className="en-US"
          model={this.state.form}
          labelWidth="120"
          onSubmit={this.onSubmit.bind(this)}
          rules={this.state.rules}
          labelPosition="top"
        >
          <Form.Item label="Username" prop="username">
            <Input
              value={this.state.form.username}
              onChange={this.onChange.bind(this, "username")}
            ></Input>
          </Form.Item>

          <Form.Item label="Password" prop="password">
            <Input
              value={this.state.form.password}
              onChange={this.onChange.bind(this, "password")}
            ></Input>
          </Form.Item>

          <Form.Item>
            <Button type="primary" nativeType="submit">
              Login
            </Button>
            <Button onClick={this.handleReset.bind(this)}>Reset</Button>
          </Form.Item>
        </Form>
      </Loading>
    );
  }
}

export default LoginForm;
