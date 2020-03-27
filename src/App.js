import React from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap';
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
                  <nav>
                      <ul>
                          <li>
                              <Link to="/"> Students </Link>
                          </li>
                          <li>
                              <Link to="/students/create"> Create Students</Link>
                          </li>
                      </ul>
                  </nav>
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
