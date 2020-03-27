import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            message: null,
            id: '',
            name: '',
            user: '',
            teacher: '',
            loading: false
        }
    }

    async componentDidMount() {
        this.getAll();
    }

    getAll = async () =>  {
        const { id } = this.props.match.params

        const res = await fetch(`http://145.24.222.245:8000/instruments/${id}`)
        const data = await res.json()

        this.setState({
           items: [data]
        })

        this.setState({
            loading: true,
            id: data._id,
            name: data.name,
            user: data.user,
            teacher: data.teacher
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        fetch(`http://145.24.222.245:8000/instruments/${this.state.id}`, {
            method: 'PUT',
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
                    message: 'Student data has changed'
                })
            }
        })
    }

    render() {
        return (
            <div>
                <h3 className="title"> Edit student details </h3>
                {
                    this.state.message ? (
                        <p>{this.state.message}</p>
                    ) : (null)
                }
                {
                    !this.state.loading ? (
                        <p>Loading...</p>
                    ) : (


                        <form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formGroupName">
                              <Form.Label>Instrument</Form.Label>
                              <Form.Control name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="formGroupUser">
                              <Form.Label>Leerling</Form.Label>
                              <Form.Control name="user" value={this.state.user} onChange={e => this.setState({ user: e.target.value })} />
                            </Form.Group>

                            <Form.Group controlId="formGroupTeacher">
                              <Form.Label>Docent</Form.Label>
                              <Form.Control name="teacher" value={this.state.teacher} onChange={e => this.setState({ teacher: e.target.value })} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Edit
                           </Button>

                      </form>
                    )
                }
            </div>
        )
    }
}

export default Detail;
