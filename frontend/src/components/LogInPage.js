import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import axios from 'axios';

export const LogInPage = () => {
    const [, setToken] = useToken();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onLoginClicked = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                email: email,
                password: password,
            });
            const { token } = response.data;
            setToken(token);
            navigate(-1);
        } catch (err) {
            if (err.response.status === 401) {
                setError("Invalid Username or passord.")
            } else {
                console.log(err);
                setError(err.message);
            }
        }
    }

    const onSignUpClicked = async () => {
        navigate('/sign-up');
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>Login</h1>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <hr />
                    <Button variant="primary" onClick={onLoginClicked}>
                        Log in
                    </Button>
                    &nbsp;

                    <Button variant="primary" onClick={onSignUpClicked} >
                        Don't have an account. Sign up
                    </Button>

                </div>
            </div>
        </div>
    );
};
