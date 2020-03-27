import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table, ListGroup} from 'react-bootstrap';

export default class Block extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.item
        }
    }

    render() {
        return (
            <div className="block">
                 <ListGroup.Item>{this.state.item.user}</ListGroup.Item>
                 <Button>
                    <Link className="link" to={`students/${this.state.item._id}/detail`}>Details</Link>
                 </Button>
                 <Button onClick={() => this.props.handleDelete(this.state.item)}>Delete</Button>
                 <Button>
                    <Link className="link" to={`students/${this.state.item._id}/edit`}>Edit</Link>
                 </Button>
            </div>
        )
    }
}
