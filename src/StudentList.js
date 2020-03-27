import React from 'react';
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
    }

    async componentDidMount() {
      this.getAll()
    }

    getAll = async () =>  {
      const res = await fetch('http://145.24.222.245:8000/instruments')
      const data = await res.json()

      this.setState({
        items: data['items']
      })

      console.log(this.state.items);
    }

    onDelete = item => {
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
                     message: `Deleted`
                 })
             }
         })

       this.setState({
           items: items.filter(item => item._id !== itemId)
       });

    }

    render() {

      return (
          <Col md={12}>
              <h3 className="title"> Manage students </h3>

              <ListGroup.Item>
                {
                    !this.state.items ? (
                      <div> {this.state.message} </div>
                    ) : (
                      this.state.items.map(item => <Block handleDelete={this.onDelete} handleEdit={this.onEdit} key={item._id} item={item}></Block>)
                    )
                }
               </ListGroup.Item>

          </Col>
      )
    }

}

export default StudentList;
