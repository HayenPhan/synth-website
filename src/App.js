import React from 'react';
import './App.css';
import { Container, Row, Navbar, Nav} from 'react-bootstrap';
import StudentList from './StudentList';
import Edit from './Edit';
import Detail from './Detail';
import Create from './Create';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class App extends React.Component {
    render() {
      return (
        <Router>
          <Container>
              <div>
                  <Navbar bg="light" expand="lg">
                  <Navbar.Brand>Music School</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <Nav.Link>
                              <Link className="link__app" to="/"> Students </Link>
                          </Nav.Link>
                          <Nav.Link>
                              <Link className="link__app" to="/students/create"> Create Students</Link>
                          </Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
                  </Navbar>

              </div>
              <Row>
                  <Switch>
                     <Route path="/" exact component={StudentList}/>
                     <Route path="/students/create" component={Create}/>
                     <Route path="/students/:id/edit" component={Edit}/>
                     <Route path="/students/:id/detail" component={Detail}/>
                  </Switch>
              </Row>
          </Container>
        </Router>
      )
    }
}

export default App;
