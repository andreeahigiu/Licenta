import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home';
import{ BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Restaurants from './components/Restaurants/Restaurants';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthProvider>
    <Router> 
      <div className="App">
        <Navbar element={<Navbar isAuth={isAuth}/>}/>

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
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/login' element={<Login setIsAuth={setIsAuth}/>}>
            <Login />
          </Route>
        </Switch>

      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
