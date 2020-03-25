import React from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import StudentList from './StudentList';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class App extends React.Component {
    render() {
      return (
        <Router>
          <Container>
              <Row>
                  <h1>Voeg een nieuwe leerling toe</h1>
                  <Switch>
                     <Route path="/" exact component={StudentList}/>
                  </Switch>
              </Row>
          </Container>
        </Router>
      )
    }
}

export default App;
