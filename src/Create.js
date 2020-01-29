import React from 'react';

class Create extends React.Component {
    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                Instrument:
                <input type="text" value={this.props.name} onChange={this.props.handleChangeName} />
                </label>
                <label>
                Leerling:
                <input type="text" value={this.props.user} onChange={this.props.handleChangeUser} />
                </label>
                <label>
                Docent:
                <input type="text" value={this.props.value} onChange={this.props.handleChangeTeacher} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Create;
