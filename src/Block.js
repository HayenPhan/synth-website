import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table, ListGroup} from 'react-bootstrap';

export default class Block extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subitem: this.props.subitem
        }
    }

    render() {
        return (
            <div key={this.props.index}>
                 <ListGroup.Item>{this.state.subitem.name}</ListGroup.Item>
                 <Link onClick={() => this.props.onDelete(this.props.index, this.props.id)}>Verwijderen</Link>
            </div>
        )
    }
}
