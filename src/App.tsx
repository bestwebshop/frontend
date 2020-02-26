import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Error404 from "./pages/Error404";
import CurrencyConverter from "./pages/CurrencyConverter";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Roles from "./pages/Roles";
import User from "./datatypes/User";
import AuthData from "./datatypes/AuthData";
import Login from "./pages/Login";
import OAuthRedirectEndpoint from "./pages/OAuthRedirectEndpoint";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>({
        id: -1,
        lastname: "-",
        firstname: "-",
        username: "-",
        password: "-",
        role: {
          id: -1,
          typ: "-",
          level: -1
        }
    });
  const [authData] = useState<AuthData>({
    code: "-",
    state: "-",
    access_token: "-"
  });
  console.log("Got auth data:", authData);
  //setAuthData(authData);
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
                  <LinkContainer to="/categories"><Nav.Link>Categories</Nav.Link></LinkContainer>
                  <NavDropdown title="Test Pages" id="basic-nav-dropdown">
                    <LinkContainer to="/currency_converter"><NavDropdown.Item>Currency Converter</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/roles"><NavDropdown.Item>Roles</NavDropdown.Item></LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="http://localhost:9200/" target="_blank">Eureka Discovery Service</NavDropdown.Item>
                    <NavDropdown.Item href="http://localhost:9206/actuator/hystrix.stream/" target="_blank">Hystrix Stream for Inventory Service</NavDropdown.Item>
                    <NavDropdown.Item href="http://localhost:9207/hystrix/monitor?stream=http%3A%2F%2Finventory-service%3A8080%2Factuator%2Fhystrix.stream" target="_blank">Hystrix Monitor for Inventory Service</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="http://localhost:9201/" target="_blank">Zuul Edge Service</NavDropdown.Item>
                    <NavDropdown.Item href="http://localhost:9207/" target="_blank">Hystrix Dashboard Service</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {loggedInUser.id === -1 ? <> </> :
                  <Navbar.Text className="nav-loginmsg">
                  Signed in as: <Link to={"/users/" + loggedInUser.id.toString()}>{loggedInUser.username}</Link>
                  </Navbar.Text>
                }
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <main className="App-body">
              {loggedInUser.id === -1 /*|| authData.access_token === "-" */ ?
                    <Switch>
                        <Route path="/OAuthRedirectEndpoint">
                            <OAuthRedirectEndpoint />
                        </Route>
                        <Route path="/:calledPath">
                            <Login logUser={loggedInUser} setLogUser={setLoggedInUser}/>
                        </Route>
                        <Route>
                            <Login logUser={loggedInUser} setLogUser={setLoggedInUser}/>
                        </Route>
                    </Switch>
                  :
                  <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/categories" component={Categories}/>
                    <Route path="/roles" component={Roles}/>
                    {/*<Route path="/OAuthRedirectEndpoint" component={OAuthRedirectEndpoint}/>*/}
                    <Route path="/currency_converter" component={CurrencyConverter}/>
                    <Route component={Error404}/>
                  </Switch>
              }
            </main>
          </div>
        </Router>
    );
}

export default App;
