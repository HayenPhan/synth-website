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
            <div>
                 <ListGroup.Item>{this.state.item.user}</ListGroup.Item>
                 <Link to={`students/${this.state.item._id}/detail`}>Details</Link>
                 <Button onClick={() => this.props.handleDelete(this.state.item)}>Verwijderen</Button>
                 <Link to={`students/${this.state.item._id}/edit`}>Edit</Link>

            </div>
        )
    }
}
