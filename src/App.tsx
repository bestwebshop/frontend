import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Error404 from "./pages/Error404";
import CurrencyConverter from "./pages/CurrencyConverter";
import UserList from "./pages/UserList";

const App = () => {
  return (
        <Router>
          <div className="App">
            <Navbar bg="dark" expand="lg" variant="dark">
              <LinkContainer to="/">
                <Navbar.Brand>
                   <img src={logo} width="30" height="30" className="d-inline-block align-top nav-logo" alt="React Bootstrap logo"/>
                  BestWebShop.TECH
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                  <LinkContainer to="/products"><Nav.Link>Products</Nav.Link></LinkContainer>
                  <LinkContainer to="/users"><Nav.Link>Users</Nav.Link></LinkContainer>
                  <NavDropdown title="Test Pages" id="basic-nav-dropdown">
                    <LinkContainer to="/currency_converter"><NavDropdown.Item>Currency Converter</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/users/1"><NavDropdown.Item>UserDetails/1</NavDropdown.Item></LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/action/3.4"><NavDropdown.Item>Separated link</NavDropdown.Item></LinkContainer>
                  </NavDropdown>
                </Nav>
                <Navbar.Text className="nav-loginmsg">
                  Signed in as: <Link to="/users/1">admin admin</Link>
                </Navbar.Text>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <main className="App-body">
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/products" component={Products}/>
                <Route path="/users" component={UserList}/>
                <Route path="/currency_converter" component={CurrencyConverter}/>
                <Route component={Error404} />
              </Switch>
            </main>
          </div>
        </Router>
    );
}

export default App;
