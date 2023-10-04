import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import RequestFormPage from '../RequestFormPage/RequestFormPage';

import UserFormPage from '../UserFormPage/UserFormPage';
import UserViewGroupPage from '../UserViewGroupPage/UserViewGroupPage';
import UserProfile from '../UserProfile/UserProfile';
import HowItWorks from '../HowItWorks/HowItWorks';
import EditProfile from '../EditProfile/EditProfile';

import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  // changes to the material ui color palette
  let theme = createTheme({
    palette: {
      primary: {
        main: '#B8CA30'
      },
      secondary: {
        main: '#17301C',
      },
      error: {
        main: '#ff312e',
      },
      warning: {
        main: '#BF6900',
      },
      info: {
        main: '#3A3335',
      },
      success: {
        main: '#276FBF'
      },
      contrastThreshold: 4.5,
      tonalOffset: 0.5,
    },
  });

  theme = createTheme(theme, {
    // Custom colors created with augmentColor 
    palette: {
      pink: theme.palette.augmentColor({
        color: {
          main: '#FFEBC8',
        },
        name: 'background',
      }),
    },
  });

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/howitworks"
          >
            <HowItWorks />
          </ProtectedRoute>

          <ProtectedRoute

            // newly registered user should be directed to this page immediately after registering!
            exact
            path="/userform"
            >
              <UserFormPage />
            </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserProfile else shows LoginPage
            exact
            path="/profile"
          >
            <UserProfile />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserProfile else shows LoginPage
            exact
            path="/editprofile"
          >
            <EditProfile />
          </ProtectedRoute>

          <ProtectedRoute
            // Group page - user view
            exact
            path="/usergroup"
          >
            <UserViewGroupPage />
          </ProtectedRoute>

          <ProtectedRoute
            // request form view
            exact
            path="/requestform"
          >
              <RequestFormPage />
          </ProtectedRoute>


          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
