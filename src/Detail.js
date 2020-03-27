import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            message: 'Loading...'
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

        console.log(this.state.items)

    }

    render() {
        return (
            <div>
                {
                    !this.state.items ? (
                      <p>{this.state.message}</p>
                    ) : (
                      <Card>
                          <Card.Header as="h5">Student</Card.Header>
                          <Card.Body>
                              <Card.Title>{this.state.items[0].user}</Card.Title>
                              <Card.Text>
                                  Teacher: {this.state.items[0].teacher}
                                  <div> </div>
                                  Instrument: {this.state.items[0].name}
                              </Card.Text>
                              <Button variant="primary">
                                  <Link className="link" to="/">
                                  Go back
                                  </Link>
                              </Button>
                          </Card.Body>
                      </Card>
                    )
                }
            </div>
        )
    }
}

export default Detail;
