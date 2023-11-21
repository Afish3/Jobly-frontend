import React, { useContext } from 'react'; 
import UserContext from "../auth/UserContext";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";
import './Nav.css';

const NavigationBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

    const NavigationLoggedOut = () => (
        <div className='Navigation'>
            <Navbar expand="md" >
                <NavbarBrand href="/">Jobly</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem className='mx-4'>
                        <NavLink to="/login" className="text-black">Login</NavLink>
                    </NavItem>
                    <NavItem className='mx-4'>
                        <NavLink to="/signup" className="text-black">Sign Up</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )

    const NavigationLoggedIn = () => (
        <div className='Navigation'>
            <Navbar expand="md" >
                <NavbarBrand href="/">Jobly</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem className='mx-4'>
                        <NavLink to="/companies" className="text-black">Companies</NavLink>
                    </NavItem>
                    <NavItem className='mx-4'>
                        <NavLink to="/jobs" className="text-black">Jobs</NavLink>
                    </NavItem>
                    <NavItem className='mx-4'>
                        <NavLink to="/profile" className="text-black">Profile</NavLink>
                    </NavItem>
                    <NavItem className='mx-4'>
                        <NavLink to="/" onClick={logout} className="text-black">Log Out</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )

    return (
        <>
            {currentUser ? NavigationLoggedIn() : NavigationLoggedOut()}
        </>
    )
}

export default NavigationBar;