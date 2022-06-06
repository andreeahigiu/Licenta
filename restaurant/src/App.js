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
// import DashboardClient from './components/DashboardClient/DashboardClient';
import DashboardRestaurant from './DashboardRestaurant/DashboardRestaurant';
import PrivateRoute from './components/PrivateRoute';
import RestaurantDetails from './components/Restaurants/RestaurantDetails';
import DashRestaurant from './components/Dashboards/DashboardRestaurant/DashRestaurant';
import DashboardClient from './components/Dashboards/DashboardClient/DashboardClient';
import MakeReservation from './components/Restaurants/MakeReservation';
import TablesBooking from './components/Restaurants/tablesBooking';

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  return (
    <Router> 
    <AuthProvider>

      <div className="App">
        <Navbar/>

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
          {/* <PrivateRoute exact path='/dashboardClient' component={DashboardClient} /> */}
          <PrivateRoute exact path='/dashboardClient' >
            <DashboardClient />
            </PrivateRoute>

          <PrivateRoute exact path='/dashboardRestaurant' >
            <DashRestaurant />
          </PrivateRoute>
          {/* <PrivateRoute exact path='/dashbboardRestaurant' component={ DashRestaurant } /> */}
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/restaurante/:id'>
            <RestaurantDetails />
          </Route>
          <Route exact path='/restaurante/:id/rezervare'>
            <MakeReservation />
          </Route>

          <Route path='/restaurante/:id/rezervare/masa'>
            <TablesBooking />
            </Route>
          
        </Switch>

      </div>
      </AuthProvider>
    </Router>

  );
}

export default App;
