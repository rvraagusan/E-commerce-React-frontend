
import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './Navbar.elements';
import { FaShoppingCart } from 'react-icons/fa';

import { signout, isAuthenticated } from "../../auth";
import { itemTotal } from "../../core/cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Navbar = ({ history }) => {
    return (
        <Nav>
            <NavLink to='/' style={isActive(history, "/")} >
                HandiCraft
            </NavLink>
            <Bars />
            <NavMenu>
                <NavLink to='/' style={isActive(history, "/")}>
                    Home
                </NavLink>
                <NavLink to='/shop' style={isActive(history, "/shop")}>
                    Shop
                </NavLink>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <NavLink to='/user/dashboard' style={isActive(history, "/user/dashboard")}>
                        DashBoard
                    </NavLink>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <NavLink to='/admin/dashboard' style={isActive(history, "/admin/dashboard")}>
                        DashBoard
                    </NavLink>
                )}
                <NavLink to='/contact' style={isActive(history, "/contact")}>
                    Contact Us
                    </NavLink>
                {!isAuthenticated() && (
                    <Fragment>
                        <NavLink to='/signup' style={isActive(history, "/signup")}>
                            Sign Up
                            </NavLink>
                    </Fragment>
                )}
            </NavMenu>
            <NavBtn>
                <NavLink to='/cart' style={isActive(history, "/cart")}>
                <FaShoppingCart size={30}/>{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </NavLink>
                {!isAuthenticated() && (
                    <Fragment>
                        <NavBtnLink to='/signin' style={isActive(history, "/signin")}>Sign In</NavBtnLink>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <NavLink to='/signout'
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Logout
                    </NavLink>
                )}
            </NavBtn>
        </Nav>
    );
};

export default withRouter(Navbar);