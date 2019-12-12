import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Alert from 'react-bootstrap/Alert';

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

function LoadingButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          BestWebShop.TECH
        </p>
        <small>
          I changed this line again to see if my update script works.
        </small>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main className="App-body">
        <LoadingButton />
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Steve Jobs</h5>
            <h6 className="card-subtitle mb-2 text-muted">steve@apple.com</h6>
            <p className="card-text">Stay Hungry, Stay Foolish</p>
          </div>
        </div>
        {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map(((variant, idx) => (
          <Alert key={idx} variant="warning">
            This is a {variant} alert—check it out!
          </Alert>
        )))}
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
      </main>
    </div>
  );
}

export default App;
