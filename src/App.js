import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Modal from "react-bootstrap/Modal";

const StyledLi = styled.li`
  font-family: Arial;
  font-size: 20px
`

const StyledUl = styled.ul`
  list-style-type: none;
`

const LiWrapper = styled.div`
    margin-bottom: 25px;
`

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: [],
          modalShow: false,
          user: '',
          teacher: '',
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

    onHide = () => this.setState({ modalShow: false });

    showModal = (user, teacher) => {
        this.setState({user: user, teacher: teacher}, ()=> this.setState({ modalShow: true }));
    }

    render() {

        const { error, isLoaded, items } = this.state;
        const itemsi = this.state.items.items;
        if (error) {
            return <div> Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div> Loading... </div>;
        } else {

                console.log(itemsi)
            return (
              <StyledUl>


                  {itemsi.map((item, i) => {

                    //const user = item.user[i];
                    //const teacher = item.teacher[i];

                    return (
                      <LiWrapper key={i}>
                           <StyledLi>
                             {item.name}
                           </StyledLi>
                           <Button onClick={() => this.showModal()}> Detail </Button>
                           <Modal show={this.state.modalShow} onHide={this.onHide}>
                           </Modal>
                       </LiWrapper>
                    )

                  })
                  }
              </StyledUl>
            )
        }
    }
}

export default App;
