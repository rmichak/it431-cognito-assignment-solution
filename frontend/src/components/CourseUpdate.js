import React, { useState, useEffect } from 'react';
import { Form, Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useToken } from "../auth/useToken";

const CourseUpdate = () => {
    const navigate = useNavigate();
    const [token] = useToken();
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/course/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(course),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then(data => {
                console.log(data);
                navigate(-1);
            })
            .catch(error => {
                console.error(error);
                setError(`Failed to update course: ${error.message}`);
            });
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/course/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCourse(data)
            });
    }
        , [id]);

    return (
        <Card>
            <Container>
                <h1>Modify Course</h1>
                {error &&
                    <Alert variant="danger" className="my-3">
                        {error}
                    </Alert>
                }
                <Row>
                    <Col>
                        <Card className="my-3 p-3 rounded">
                            <Form>
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Course Title"
                                        name="title"
                                        value={course.title}
                                        onChange={handleInputChange}

                                    />
                                </Form.Group>
                                <Form.Group controlId="formformDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Course Description"
                                        name="description"
                                        value={course.description}
                                        onChange={handleInputChange}

                                    />
                                </Form.Group>
                                <Form.Group controlId="formEstimatedTime">
                                    <Form.Label>Estimated Time</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Course Time Estimate"
                                        name="estimatedTime"
                                        value={course.estimatedTime}
                                        onChange={handleInputChange}

                                    />
                                </Form.Group>
                            </Form>



                        </Card>
                        <Button onClick={handleSubmit} variant="primary">Save</Button>
                        &nbsp;
                        <Button onClick={() => navigate(-1)} variant="primary">Cancel</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default CourseUpdate;
