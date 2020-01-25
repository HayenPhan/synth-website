import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: []
      }
    }

    componentDidMount() {
        fetch("http://145.24.222.245:8000/instruments")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {

        const { error, isLoaded, items } = this.state;
        const itemsi = this.state.items.items;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div> Loading... </div>;
        } else {
            return (
              <ul>

              {itemsi.map(item => (
                 <li key={item.id}>
                   {item.name}
                 </li>
              ))}

              </ul>
            )
        }
    }
}

export default App;
