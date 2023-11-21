import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './auth/api';
import jwt from "jsonwebtoken";
import Loading from './Loading';
import UserContext from './auth/UserContext';
import Nav from './nav/Nav';
import Routes from './routes/Routes';
import './App.css';

function App() {
  /** State for the current user, loading status, users applications and the users
   * jwt token from the API are stored in the App component.
   * 
   * jwt token is stored in state as well as local storage so long as there is a value.
   * 
   * see hooks/useLocalStorage.js for more information on the custom useLocalStorage hook.
   */
  const [isLoaded, setIsLoaded] = useState(false)
  const [applications, setApplications] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage("jwt-jobly");

  /** useEffect hook is called anytime there are changes to the `token` state such as 
   * logging in a user.
   * 
   * Token is grabbed from state after logging in or signing up and added to the API class.
   * 
   * The username is decoded from the token and used to get the users details for
   * saving the currentUser and the current users applications information in state.
   */

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          JoblyApi.token = token;

          let { username } = jwt.decode(token);
          let currentUser = await JoblyApi.getCurrentUser(username);

          setCurrentUser(currentUser);
          setApplications(new Set(currentUser.applications));
        } catch (err) {
          console.error("Error loading user info", err);
          setCurrentUser(null);
        }
      }
      setIsLoaded(true);
    }
    setIsLoaded(false);
    getCurrentUser();
  }, [token]);

  /** singup function asynchronously calls the API and awaits a res token.
   * 
   * Token is set in state.
   */

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  /** login function asynchronously calls the API and awaits a res token.
   * 
   * Token is set in state.
   */

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  /** Log out a user. Clear storage and local storage. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Checks if a job has been applied for by user. */
  function hasApplied(id) {
    return applications.has(id);
  }

  /** Calls API to allow user to apply to a job. 
  * 
  * State for applications is updated.
  */
  function apply(id) {
    if (hasApplied(id)) return;
    JoblyApi.apply(currentUser.username, id);
    setApplications(new Set([...applications, id]));
  }

  if (!isLoaded) return <Loading />;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, hasApplied, apply }}>
      <div className="App">
        <header className="App-header">
          <Nav logout={logout}/>
          <Routes login={login} signup={signup} />
        </header>
      </div>
    </UserContext.Provider>
  );
}

export default App;
