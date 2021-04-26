import React from 'react'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { eel } from './eel';
import './App.css';
import TextEdEditor from './features/editor/presentation/pages/editor/TextedEditor';
import Home from './features/editor/presentation/pages/home/home.component';
const App = ()=>{
  
  eel.set_host("ws://localhost:8888");
  

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/editor' component={TextEdEditor} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;