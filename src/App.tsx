import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Alert, Button, ButtonToolbar, Container, Row, Col} from 'react-bootstrap';
import LoadingButton from "./components/LoadingButton";
import ProductList from "./components/ProductList";
import ProductListEntry from "./components/ProductListEntry";
import AutoList from "./components/AutoList";

const App = () => {
  const [currencyApiResp, setCurrencyApiResp] = useState([{name:"Currencies",list:[{key:"click button",value:"to load"}]}]);
  return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>BestWebShop.TECH</p>
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
                  ... 1 ...
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
                  <LoadingButton currencyApiResp={setCurrencyApiResp}  />
                  <br/>
                  {/*Look in Console Log <br/>*/}
                </Col>
                <Col sm>
                  <AutoList kvlist={currencyApiResp[0]} />
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
                    <Button variant="dark">Dark</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Container>
          </main>
        </div>
    );
}

export default App;
