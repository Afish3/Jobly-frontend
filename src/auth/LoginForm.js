import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";
import './LoginForm.css';

/** Login form for users */

const LoginForm = ({ login }) => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(d => ({ ...d, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      redirect("/");
    } else {
      setFormErrors(result.err);
    }
  }

  return (
      <div className="LoginForm">
          <div className="card">
            <h2 className="mx-3">Login</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group my-2">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary px-5 float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
  );
}

export default LoginForm;
