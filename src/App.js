import React from 'react';
import './App.css';
import Nav from './Components/nav';
import SupplierForm from './Components/form';
import Supplier from './Components/supplier';
import Login from './Components/login';
import Table from './Components/table';
import { Card } from 'element-react';
import ScrollToTop from './Components/scrollToTop';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
      <ScrollToTop>
        <div className="App">
          <Nav />
          
          <Card style={{ "maxWidth": "80%", "margin": "auto", "marginTop": "20px" }}>
            <Switch>
            
              <Route exact path="/" component={SupplierForm} />
              <Route path="/supplier-list" component={Table} />
              <Route path="/login" component={Login} />
              <Route path="/supplier/:supplierID" component={Supplier} />
            </Switch>
          </Card>

        </div>
        </ScrollToTop>
      </Router>
    );
  }
}


export default App;
