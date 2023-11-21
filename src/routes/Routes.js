import React from "react";
import { Routes,  Route } from "react-router-dom";
import PrivateRoute from "./Private";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import ProfileForm from "../user/ProfileForm";


const RoutesList = ({ login, signup}) => (

        <Routes>
            <Route exact path="/" element={<Homepage />}> </Route>

            <Route exact path="/login" element={<LoginForm login={login} />}> </Route>

            <Route exact path="/signup" element={<SignupForm signup={signup} />}> </Route>

            <Route exact path="/companies" element={
                <PrivateRoute exact path="/companies">
                    <CompanyList />
                </PrivateRoute>
            }> </Route>

            <Route exact path="/jobs" element={
                <PrivateRoute exact path="/jobs">
                    <JobList />
                </PrivateRoute>
            }> </Route>

            <Route exact path="/companies/:handle" element={
                <PrivateRoute exact path="/companies/:handle">
                    <CompanyDetail />
                </PrivateRoute>
            }> </Route>

            <Route exact path="/profile" element={
                <PrivateRoute path="/profile">
                    <ProfileForm />
                </PrivateRoute>
            }> </Route>

            <Route path="/" />
        </Routes>
    )

export default RoutesList;
