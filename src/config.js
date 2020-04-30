const dev = {
  apiGateway: {
    BASE_URL: "http://supplierlibrary-api-dev.us-west-2.elasticbeanstalk.com/api"
  }
};

const prod = {
  apiGateway: {
    BASE_URL: "http://supplierlibrary-api-dev.us-west-2.elasticbeanstalk.com/api"
  }
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config
};
