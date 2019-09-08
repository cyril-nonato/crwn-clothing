import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route, Switch } from 'react-router-dom';

const Hats = () => {
  return (
    <div>
      Hats Page
    </div>
  )
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/hats" component={Hats} />
      </Switch>
    </div>
  );
}

export default App;
