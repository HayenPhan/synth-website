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
            items:[],
            test: ''
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



    onDelete = async (i, val, e) => {
        //e.preventDefault();
        deleteStudent(val)

        //this.state.items[0].items

        const test = {
            "items": {
              "name": "hayen",
              "id": "5e34500b1068233b16792bca"
            },
        }


        // Place [] around certain objects
        const res = Object.keys(test).reduce((acc, key) => ({...acc, [key]:[test[key]]}), {});

        // Test
        const formattedTest = [res];

        // This.state
        const state = this.state.items;


        //const testItems = hest.filter(el => el.items[i].id !== val);

        // Mapping
        const firstMap = state.map((item, index) => {
            return item.items
        });

        // Filtering
        const testItems2 = firstMap.filter(el => el[i]._id !== val);

        //const testItems = state.filter(el => {
            //return el.items[i].id !== val
        //});

        await this.setState({ items: [...testItems2], test: 'Lol' })

        console.log(this.state)

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
                               <Button href="" disabled={this.state.editDisabled} onClick={this.onEdit.bind(this, subitem.id)}>Edit</Button>
                               <Button href="" disabled={this.state.editDisabled} onClick={this.onDelete.bind(this, i, subitem.id,)}>Delete</Button>
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
