import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

const CourseDetails = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const [token] = useToken();
    const [error, setError] = useState('');
    const user = useUser();
    const [loggedIn,] = useState(user !== null);

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`${process.env.REACT_APP_API_URL}/api/course/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(() => {
                navigate('/courses');
            })
            .catch(error => {
                setError(error.message);
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/course/${id}`)
            .then(response => {
                console.log(response.data);
                setCourse(response.data)
            })
            .catch(error => {
                setError(error.message);
                console.log(error);
            });
    }, [id]);

    return (
        <Card>
            <Container>
                <h1>{course.title}</h1>
                <Button onClick={() => navigate(-1)} variant="primary">Back</Button>
                &nbsp;
                {loggedIn &&
                    <LinkContainer to={`/courses/update/${id}`}>
                        <Button disabled={!loggedIn} variant="primary">Edit Course</Button>
                    </LinkContainer>
                }
                &nbsp;
                {loggedIn &&
                    <Button onClick={handleDelete} variant="primary">Delete Course</Button>

                }
                {error &&
                    <Alert variant="danger" className="my-3">
                        {error}
                    </Alert>
                }
                <Row>
                    <Col>
                        <Card className="my-3 p-3 rounded">
                            <Card.Title as="div">
                                <strong>{course.title}</strong>
                            </Card.Title>
                            <Card.Text as="div">
                                <div className="my-3">
                                    {course.description}
                                </div>
                            </Card.Text>
                            <Card.Text as="h3">
                                {course.estimatedTime}
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default CourseDetails;
