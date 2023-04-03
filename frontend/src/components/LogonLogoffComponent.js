import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useUser } from '../auth/useUser';
import { useNavigate } from 'react-router-dom';

const LogonLogoffComponent = () => {
    const user = useUser();

    const [, setLoggedIn] = useState(user !== null);
    const navigate = useNavigate();

    const handleLogoff = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login');
    };

    const handleLogon = () => {
        navigate('/login');
    };

    return (
        <Nav>
            <NavDropdown title="Authentication" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogoff}>Logoff</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogon}>Logon</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default LogonLogoffComponent;
