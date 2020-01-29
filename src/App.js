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
            name: '',
            teacher: '',
            items: [],
            isLoaded: false,
            error: null,
        }

         this.getInstruments = this.getInstruments.bind(this);
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

    render() {
      return (
        <Router>
            <Switch>
                <Route path="/create">
                  <Create />
                </Route>
                <Route path="/" render={()=><Overview items={this.state.items} error={this.state.error} isLoaded={this.state.isLoaded} />}/>
            </Switch>
        </Router>
      )


    }
}

export default App;
