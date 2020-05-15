import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Browser from './components/Browser';
import FullOverview from './components/CharacterFullOverview';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Browser}></Route>
          <Route path="/character/:id">
            <FullOverview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
