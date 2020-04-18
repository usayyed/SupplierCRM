import React from 'react';
import './App.css';
import UnderConstruction from './Components/underConstruction';
import Nav from './Components/nav';
import SupplierForm from './Components/form';
import Supplier from './Components/supplier';
import Login from './Components/login';
import { Card } from 'element-react';

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
              <Route path="/supplier-list" component={UnderConstruction} />
              <Route path="/login" component={Login} />
              <Route path="/supplier/:supplierID" component={Supplier} />
            </Switch>
          </Card>

        </div>
      </Router>
    );
  }
}


export default App;
