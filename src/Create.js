import React from 'react';
import styled from 'styled-components';

class Create extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                Instrument:
                <input type="text" value={this.props.nameValue} onChange={this.props.handleChangeName} />
                </label>
                <label>
                Leerling:
                <input type="text" value={this.props.userValue} onChange={this.props.handleChangeUser} />
                </label>
                <label>
                Docent:
                <input type="text" value={this.props.teacherValue} onChange={this.props.handleChangeTeacher} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Create;
