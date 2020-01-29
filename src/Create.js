import React from 'react';
import axios from 'axios';

class Create extends React.Component {
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


    handleSubmit = (event) => {

        // event preventdefault let the code work, but values are not resetted and you have to refresh the page. Async is the problem

        axios.post(
        'http://145.24.222.245:8000/instruments',
        {
            name: this.state.name,
            user: this.state.user,
            teacher: this.state.teacher
        },
        {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            console.log(res)
        })

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Instrument:
                <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                </label>
                <label>
                Leerling:
                <input type="text" value={this.state.user} onChange={this.handleChangeUser} />
                </label>
                <label>
                Docent:
                <input type="text" value={this.state.teacher} onChange={this.handleChangeTeacher} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Create;
