import React from "react";
import {v4 as uuid} from "uuid";

/** Used to alert error messages when logging in or signing up with invalid
 * credentials. */

const Alert = ({ type = "danger", messages = [] }) => {

  return (
      <div className={`alert alert-${type}`} role="alert">
        {messages.map(error => (
            <p className="mb-0 small" key={uuid()}>
              {error}
            </p>
        ))}
      </div>
  );
}

export default Alert;
