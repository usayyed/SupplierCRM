const dev = {
  apiGateway: {
    BASE_URL: "http://localhost:8000/api"
  }
};

const prod = {
  apiGateway: {
    BASE_URL: "http://ec2-18-144-81-114.us-west-1.compute.amazonaws.com:8000/api"
  }
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config
};
