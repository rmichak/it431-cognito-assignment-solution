//create a Home React component
//this component will be used in the app.js file
import React from 'react';
import { Card, Container } from 'react-bootstrap';

const Home = () => {
    return (
        <Card>
            <Container>
                <h1>Welcome to the Course App</h1>
                <p>
                    This is a simple app that allows you to view, create, update, and delete courses.
                </p>
            </Container>
        </Card>
    )
}

export default Home;