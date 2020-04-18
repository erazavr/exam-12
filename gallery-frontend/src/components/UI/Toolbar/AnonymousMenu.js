import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const AnonymousMenu = () => (
        <>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/register" exact>Регистрация</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/login" exact>Войти </NavLink>
            </NavItem>
        </>
);

export default AnonymousMenu;