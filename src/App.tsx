import React from 'react'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import TextEdEditor from './features/editor/presentation/pages/editor/TextedEditor';
import Home from './features/editor/presentation/pages/home/home.component';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component={Home} />
        <Route exact path='/editor' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;