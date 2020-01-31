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



    onDelete = (val, e) => {
        const initialState = {};
        e.preventDefault();
        deleteStudent(val)

        this.state.items.map((item, index) => (
            console.log(item.items)
        ))

        //this.state.items[0].items

        const test = {
            "items": {
              "name": "hayen",
              "id": "5e2f1bf31068233b167929d8"
            },
        }

        const res = Object.keys(test).reduce((acc, key) => ({...acc, [key]:[test[key]]}), {});

        const west = [res];
        const hest = this.state.items;

        const list1 = this.state.items.map((item, i) => {
            //this.state.item.filter(el => console.log(el))
            return item;
        });

        const list2 = list1.map((it, i) => {
            //this.state.item.filter(el => console.log(el))
            return it;
        });

        //const real1 = list1.items.map((een) => {
            //return een;
        //});

        //console.log(list2);

        const list3 = list2.map((mup, i) => {
            //this.state.item.filter(el => console.log(el))
            return mup;
        });


        //const newItems = west.filter(el => el.id !== val);

        const newItems = west.filter(el => {

          const list4 = el.items.map((it, i) => {
              //this.state.item.filter(el => console.log(el))
              return it.id
          });

          console.log(list4)


        });

        


        //console.log([res])

        this.setState({ items: testie })




        //console.log(best.filter(el => el.id !== val))



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
                               <Button href="" disabled={this.state.editDisabled} onClick={this.onDelete.bind(this, subitem.id)}>Delete</Button>
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
