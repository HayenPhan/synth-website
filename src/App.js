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

const ModalHeader = styled(Modal.Header)`
    @import url('https://fonts.googleapis.com/css?family=Poppins:300,500,700&display=swap');
    color: #324BB8;
    font-family: Poppins;
    font-weight: 700;
    text-indent: 4px;
`;

const ModalBody = styled(Modal.Body)`
    @import url('https://fonts.googleapis.com/css?family=Poppins:300,500,700&display=swap');
    color: #717171;
    font-family: Poppins;
    font-weight: 300;
    text-indent: 4px;
`;

const BackButton = styled.button`
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    width: 100px;
    letter-spacing: 1px;
    height: 41px;
    border-radius: 6px;
    border: none;
    margin: 0;
    text-decoration: none;
    background: #324BB8;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
`;



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
            return (
              <StyledUl>


                  {itemsi.map((item, i) => {


                    return (
                      <LiWrapper key={i}>
                           <StyledLi>
                             {item.name}
                           </StyledLi>
                           <Button onClick={() => this.showModal(item.user, item.teacher)}> Detail </Button>
                           <Modal show={this.state.modalShow} onHide={this.onHide}>
                               <ModalHeader closeButton>Close</ModalHeader>
                               <ModalBody>
                                  {this.state.user}

                                  {this.state.teacher}

                               </ModalBody>
                               <Modal.Footer>
                                    <BackButton onClick={this.onHide}>Back</BackButton>
                              </Modal.Footer>
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
