import React from 'react';
import './App.css';
import TableComponent from './Components/table';
import Nav from './Components/nav';
import SupplierForm from './Components/form';
import Supplier from './Components/supplier';
import { Card } from 'element-react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Card style={{ "maxWidth": "60%", "margin": "auto", "marginTop": "20px" }}>
            <Switch>
              <Route exact path="/" component={SupplierForm} />
              <Route path="/supplier-list" component={TableComponent} />
              <Route path="/supplier/:supplierID" component={Supplier} />
              <Route path="/form" component={SupplierForm} />
            </Switch>
          </Card>

        </div>
      </Router>
    );
  }
}


export default App;
