import React from 'react';
import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';

import Overview from './Overview';
import Create from './Create';
import axios from 'axios';

class App extends React.Component {
    constructor() {
      super();
        this.state = {
            // Overview
            items: [],
            isLoaded: false,
            error: null,

            //Create
            name: '',
            user: '',
            teacher: ''

        }

         this.getInstruments = this.getInstruments.bind(this);

         // create
         this.handleChangeName = this.handleChangeName.bind(this);
         this.handleChangeUser = this.handleChangeUser.bind(this);
         this.handleChangeTeacher = this.handleChangeTeacher.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getInstruments();
    }

    getInstruments = () => {
      // This is where the data is hosted
      axios.get(`http://145.24.222.245:8000/instruments`)
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        this.setState({
          items: response.data,
          isLoaded: true
        });
      })

      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({ error, isLoaded: true }));
    }

    // Create

    handleChangeName(event) {
        this.setState({ name: event.target.value }) //event.target.value
    }

    handleChangeUser(event) {
        this.setState({ user: event.target.value })
    }

    handleChangeTeacher(event) {
        this.setState({ teacher: event.target.value })
    }

    handleSubmit = (event) => {

        // event preventdefault let the code work, but values are not resetted and you have to refresh the page. Async is the problem
        event.preventDefault();

        //const bodyFormData = new FormData();

        axios.post(
        'http://145.24.222.245:8000/instruments',
        {
            name: this.state.name,
            user: this.state.user,
            teacher: this.state.teacher
        },
        {
          headers: {
             'Content-Type': 'application/json',
          },
        })
        .then(res => {
            console.log(res.data);
        })

    }


    render() {
      return (
        <Router>
            <Switch>
                <Route path="/create" render={()=><Create handleSubmit={this.handleSubmit} name={this.state.name} user={this.state.user} teacher={this.state.teacher} handleChangeName={this.handleChangeName} handleChangeUser={this.handleChangeUser} handleChangeTeacher={this.handleChangeTeacher} />}/>
                <Route path="/" render={()=><Overview items={this.state.items} error={this.state.error} isLoaded={this.state.isLoaded} />}/>
            </Switch>
        </Router>
      )


    }
}

export default App;
