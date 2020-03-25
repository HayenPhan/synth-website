import React from 'react';
import {getStudents, addStudent, deleteStudent, updateStudent} from './StudentFunctions.js';
import { Container, Row, Col, Form, Button, Table, ListGroup} from 'react-bootstrap';
import Block from './Block';

class StudentList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            user: '',
            teacher: '',
            editDisabled: false,
            items: null,
            test: '',
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    async componentDidMount() {
      this.getAll()
    }

    onChange = e => {
          this.setState({ [e.target.name]: e.target.value })
    }

    getAll = async () =>  {
      const res = await fetch('http://145.24.222.245:8000/instruments')
      const data = await res.json()

      this.setState({
        items: data['items']
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



    onDelete = item => {
        //e.preventDefault();
        const self = this
        const itemId = item._id
        const items = this.state.items

        fetch(`instruments/${itemId}`, {
           method: 'DELETE',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
         }).then(res => {
             if (res.ok) {
                 self.setState({
                     message: `Verwijderd`
                 })
             }
         })

        console.log('before setState');
        console.log(this.state.items);

       this.setState({
           items: items.filter(item => item._id !== itemId)
       });

       console.log('after setState');
       console.log(this.state.items);

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

              <ListGroup.Item>
                {
                    !this.state.items ? (
                      <div style={{ backgroundColor: '#5CB85C', color: 'white', padding: '10px' }}>{this.state.message}</div>
                    ) : (
                      this.state.items.map(item => <Block handleDelete={this.onDelete} key={item._id} item={item}></Block>)
                    )
                }
               </ListGroup.Item>

          </Col>
      )
    }

}

export default StudentList;
