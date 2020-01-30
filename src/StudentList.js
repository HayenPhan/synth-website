import React from 'react';
import {getStudents, addStudent, deleteStudent, updateStudent} from './StudentFunctions.js';
import { Container, Row, Col, Form, Button, Table, ListGroup} from 'react-bootstrap';

class StudentList extends React.Component {
    constructor(){
        super();
        this.state = {
            id: '',
            name: '',
            user: '',
            teacher: '',
            editDisabled: false,
            items:[]
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        this.getAll()
    }

    onChange = e => {
          this.setState({ [e.target.name]: e.target.value })
    }

    getAll = () => {
        getStudents().then(data => {
            this.setState({
                name: '',
                user: '',
                teacher: '',
                items: [data],
            },
            () => {
                console.log(this.state.items)
            }
          )
        })
    }

    onSubmit = e => {
        e.preventDefault()
        addStudent(this.state.name, this.state.user, this.state.teacher).then(() => {
            this.getAll()
        })
        this.setState({
            name: '',
            user: '',
            teacher: ''
        })
    }

    onUpdate = e => {
        e.preventDefault()
        updateStudent(this.state.name, this.state.user, this.state.teacher, this.state.id).then(() => {
            this.getAll()
        })
        this.setState({
            name: '',
            user: '',
            teacher: '',
            editDisabled: ''
        })
        this.getAll()

    }

    onEdit = (itemid, e) => {
        e.preventDefault()

        const data = this.state.items;

        data.forEach((item, index) => {
            if(item._id === itemid) {
                this.setState({
                    id: item._id,
                    name: item.name,
                    user: item.user,
                    teacher: item.teacher,
                    editDisabled: true
                })
            }
        })
    }

    onDelete = (val, e) => {
        e.preventDefault();
        deleteStudent(val)
        this.getAll()
    }

    render() {

      return (
          <Col md={12}>
              <Form onSubmit={this.onSubmit}>
                  <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Row>
                          <Col md={12}>
                              <Form.Control type="text" id="name" name="name" value={this.state.name || ''} onChange={this.onChange.bind(this)} />
                          </Col>
                      </Row>
                      <Form.Label>User</Form.Label>
                      <Row>
                          <Col md={12}>
                              <Form.Control type="text" id="user" name="user" value={this.state.user || ''} onChange={this.onChange.bind(this)} />
                          </Col>
                      </Row>
                      <Form.Label>Teacher</Form.Label>
                      <Row>
                          <Col md={12}>
                              <Form.Control type="text" id="teacher" name="teacher" value={this.state.teacher || ''} onChange={this.onChange.bind(this)} />
                          </Col>
                      </Row>
                  </Form.Group>
                  {!this.state.editDisabled ? (
                      <Button type="submit" onClick={this.onSubmit.bind(this)}> Submit </Button>
                  ) : (
                    ''
                )}
                {this.state.editDisabled ? (
                    <Button type="submit" onClick={this.onSubmit.bind(this)}> Update </Button>
                ): (
                    ''
                )}
              </Form>
              <ListGroup>

                          {this.state.items.map((item, index) => (
                            <ListGroup.Item key={index}>
                               {
                                  item.items.map((subitem, i) => {
                                    return (
                                      <div key={i}>
                                       <ListGroup.Item>{subitem.name}</ListGroup.Item>
                                       <Button href="" disabled={this.state.editDisabled} onClick={this.onEdit.bind(this, subitem._id)}>Edit</Button>
                                      <Button href="" disabled={this.state.editDisabled} onClick={this.onEdit.bind(this, subitem._id)}>Delete</Button>
                                       </div>
                                    )
                                  })
                              }
                          </ListGroup.Item>
                          ))}

              </ListGroup>
          </Col>
      )
    }

}

export default StudentList;
