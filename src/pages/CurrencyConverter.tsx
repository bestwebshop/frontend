import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import AutoList from "../components/AutoList";
import LoadCurrencyButton from "../components/LoadCurrencyButton";

const CurrencyConverter = () => {
  const [currencyApiResp, setCurrencyApiResp] = useState([{name:"Currencies",list:[{key:"click button",value:"to load"}]}]);
  return (
      <Container>
        <Row>
          <Col sm={12}>
            <h2>CurrencyConverter</h2>
          </Col>
        </Row>
          <Row>
              <Col sm={2}>
                  <LoadCurrencyButton currencyApiResp={setCurrencyApiResp}  />
              </Col>
              <Col sm={10}>
                  <AutoList kvlist={currencyApiResp[0]} />
              </Col>
          </Row>
      </Container>
  );
}

export default CurrencyConverter