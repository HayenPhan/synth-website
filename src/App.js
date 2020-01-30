import React from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import StudentList from './StudentList';

class App extends React.Component {
    render() {
      return (
          <Container>
              <Row>
                  <h1>Voeg een nieuwe leerling toe</h1>
                  <StudentList />
              </Row>
          </Container>
      )
    }
}

export default App;
