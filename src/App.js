import React from 'react';
import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';

import Overview from './Overview';
import Create from './Create';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
          name: '',
          user: '',
          teacher: ''
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeTeacher = this.handleChangeTeacher.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value }) //event.target.value
    }

    handleChangeUser(event) {
        this.setState({ user: event.target.value })
    }

    handleChangeTeacher(event) {
        this.setState({ teacher: event.target.value })
    }

    handleSubmit = async (event) => {

        event.preventDefault();  // event preventdefault let the code work, but values are not resetted and you have to refresh the page. Async is the problem

        const response = await axios.post(
        'http://145.24.222.245:8000/instruments',
        {
            name: this.state.name,
            user: this.state.user,
            teacher: this.state.teacher
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
        )
        
    }

    render() {

      return (
        <Router>
            <Switch>
                <Route path="/create" render={()=>
                <Create handleSubmit={this.handleSubmit} nameValue={this.state.name} userValue={this.state.user} teacherValue={this.state.teacher} handleChangeName={this.handleChangeName} handleChangeUser={this.handleChangeUser} handleChangeTeacher={this.handleChangeTeacher} />}/>
                <Route path="/">
                  <Overview />
                </Route>
            </Switch>
        </Router>
      )


    }
}

export default App;
