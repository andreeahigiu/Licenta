import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home';
import{ BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Restaurants from './components/Restaurants/Restaurants';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router> 
      <div className="App">
        <Navbar />
        
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/restaurante'>
            <Restaurants />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/contact'>
            <Contact />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
