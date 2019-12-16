import React, { useState, useEffect, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Alert, Button, ButtonToolbar, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import ProductList from "./components/ProductList";
import ProductListEntry from "./components/ProductListEntry";

function get_products() {
  return axios.get('https://api.exchangeratesapi.io/latest');
}

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      get_products().then((response) => {
        setLoading(false);
        console.log(response.data);  //        console.log(response.status);        console.log(response.statusText);        console.log(response.headers);        console.log(response.config);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : ()=>{}}
    >
      {isLoading ? 'Loading…' : 'Click to load'}
    </Button>
  );
}

class App extends Component {

  render()
  {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>BestWebShop.TECH</p>
            <small>Latest Update: 16.12.2019 19:30</small>
          </header>

          <main className="App-body">
            <Container>
              <Row>
                <Col sm={8}>
                  <Alert variant="warning">
                    This Website is Work-In-Progress!
                  </Alert>
                </Col>
                <Col sm={4}>
                  ...1...
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <ProductList>
                    <ProductListEntry name="Shoes" />
                    <ProductListEntry name="Shirts" />
                    <ProductListEntry name="Jackets" />
                  </ProductList>
                </Col>
                <Col sm>
                  <LoadingButton/>
                  <br/>
                  Look in Console Log
                </Col>
                <Col sm>
                  ...2...
                </Col>
              </Row>
              <Row>
                <Col sm>
                  <ButtonToolbar>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="light">Light</Button>
                    <Button variant="dark">Dark</Button>
                    <Button variant="link">Link</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Container>
          </main>
        </div>
    );
  }
}

export default App;
