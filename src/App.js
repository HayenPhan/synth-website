import React from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import StudentList from './StudentList';
import Edit from './Edit';
import Detail from './Detail';

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
                  <Switch>
                     <Route path="/" exact component={StudentList}/>
                     <Route path="/edit/:id" component={Edit}/>
                     <Route path="/detail/:id" component={Detail}/>
                  </Switch>
              </Row>
          </Container>
        </Router>
      )
    }
}

export default App;
