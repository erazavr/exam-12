import React from 'react';
import {Button} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <div>
            <ul style={{listStyle: 'none'}}>
                <li className='mb-3'>Привет <RouterNavLink to={`/view/${user._id}`}>{user.firstName || user.username}!</RouterNavLink></li>
                <li><Button color='primary' onClick={logout}>Выйти</Button></li>
            </ul>
        </div>
    );
};
export default UserMenu;