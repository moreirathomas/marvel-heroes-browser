import React from 'react';
import './App.css';
import './components/Browser.css';
import './components/FullOverview.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Browser from './components/Browser';
import FullOverview from './components/FullOverview';

function Header() {
  return (
    <header className="App-header">
      <h1>Marvel Heroes Browser</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="App-footer">
      <div className="links">
        <p>
          Data provided by <a href="http://marvel.com">Marvel</a>. © 2020 MARVEL
        </p>
        <p>
          Made with <a href="https://reactjs.org">React</a>. © 2020 Thomas
          Moreira
        </p>
        <p>
          See on{' '}
          <a href="https://github.com/moreirathomas/marvel-heroes-browser">
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Switch>
            <Route exact path="/" component={Browser}></Route>
            <Route
              path="/character/:id"
              render={(props) => <FullOverview {...props} />}
            ></Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
