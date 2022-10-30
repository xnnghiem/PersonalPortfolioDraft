import './App.css';

import Home from './Home';
import About from './About';
import Resume from './Resume';
import Code from './Code';
import MyShop from './MyShop';
import Contact from './Contact';
import NavBar from './NavBar';

import {Route, Link} from 'react-router-dom';



function App() {


  return (
    <div className="App">
      <div className="App App-header">
        <header>
          <h1>Xuan Nghiem</h1>
          <img src='./sun1.png' className="App-logo" alt="logo"/>
          <NavBar />
          </header>
      </div>
    <div className="App-body">
      <body>
        <Route exact path='/' component = {Home}/>
        <Route exact path='/about' component = {About}/>
        <Route exact path='/resume' component = {Resume}/>
        <Route exact path='/code' component = {Code}/>
        <Route exact path='/shop' component = {MyShop}/>
        <Route exact path='/contact' component = {Contact}/>
      </body>
    </div>
    </div>
  );
}

export default App;
