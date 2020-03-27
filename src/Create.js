import React from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        fetch(`http://145.24.222.245:8000/instruments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.name.value,
                user: e.target.user.value,
                teacher: e.target.teacher.value
            })
        }).then(res => {
            if (res.ok) {
                this.setState({
                    message: 'Student is aangemaakt'
                })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.message ? (
                        <p>{this.state.message}</p>
                    ) : (null)
                }

              <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Instrument</Form.Label>
                        <Row>
                            <Col md={12}>
                                <Form.Control type="text" id="name" name="name" />
                            </Col>
                        </Row>
                        <Form.Label>User</Form.Label>
                        <Row>
                            <Col md={12}>
                                <Form.Control type="text" id="user" name="user" />
                            </Col>
                        </Row>
                        <Form.Label>Teacher</Form.Label>
                        <Row>
                            <Col md={12}>
                                <Form.Control type="text" id="teacher" name="teacher"  />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button type="submit"> Submit </Button>
                </Form>
            </Container>

            </div>
        )
    }
}

export default Create;
