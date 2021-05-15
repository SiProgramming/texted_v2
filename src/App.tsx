import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { eel } from './eel';
import './App.css';
import Home from './pages/home/home.component';
import TextedEditor from './pages/editor/TextedEditor';

const App = () => {

  eel.set_host("ws://localhost:8888");


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route  path='/editor' component={TextedEditor} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;