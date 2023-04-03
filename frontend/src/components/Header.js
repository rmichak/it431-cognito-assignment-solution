import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUser } from '../auth/useUser';
import LogonLogoffComponent from './LogonLogoffComponent';


const Header = () => {
    const user = useUser();
    const [, setLoggedIn] = useState(user !== null);


    useEffect(() => {
        setLoggedIn(user !== null);
    }, [user]);


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Courses</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/courses">
                            <Nav.Link>Courses</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <LogonLogoffComponent />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
