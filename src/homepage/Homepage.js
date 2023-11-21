import React, { useContext } from 'react'; 
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
import './Homepage.css';

/** Site homepage */

const Homepage = () => {
  const { currentUser } = useContext(UserContext)

  return (
      <div className="Homepage">
        <div className="Homepage-container text-center">
          <h1 className="Homepage-title font-weight-bold">Jobly</h1>
          <p className="lead">All the jobs in one, convenient place.</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
