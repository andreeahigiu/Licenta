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
import DashboardClient from './components/DashboardClient/DashboardClient';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router> 
    <AuthProvider>

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
          <PrivateRoute exact path='/dashboardclient' component={DashboardClient} />
          <Route exact path='/login'>
          {/* <Route exact path='/login' element={<Login setIsAuth={setIsAuth}/>}> */}
            <Login />
          </Route>
          
        </Switch>

      </div>
      </AuthProvider>
    </Router>

  );
}

export default App;
