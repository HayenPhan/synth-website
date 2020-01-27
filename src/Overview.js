import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    background: #324BB8";
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
`;

const DetailButton = styled(Button)`
    background-color: ${props => props.primary ? "#123ddb" : "#00d199"};
    border: none;
`;



class Overview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: [],
          modalShow: false,
          name: '',
          teacher: '',
          inputName: '',
          inputUser: '',
          inputTeacher: '',
      }

       this.getInstruments = this.getInstruments.bind(this);
    }

    componentDidMount() {
        this.getInstruments();
    }

    onHide = () => this.setState({ modalShow: false });

    showModal = (name, teacher) => {
        this.setState({name: name, teacher: teacher}, ()=> this.setState({ modalShow: true }));
    }

    getInstruments = () => {
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
              <StyledUl>

                  <DetailButton>
                      <Link to="/create"> Nieuwe leerling aanmaken </Link>
                  </DetailButton>

                  {itemsi.map((item, i) => {


                    return (
                      <LiWrapper key={i}>
                           <StyledLi>
                             {item.user}
                           </StyledLi>
                           <DetailButton primary="true" onClick={() => this.showModal(item.name, item.teacher)}> Detail </DetailButton>
                           <Modal show={this.state.modalShow} onHide={this.onHide}>
                               <ModalHeader closeButton>Close</ModalHeader>
                               <ModalBody>
                                  <div>
                                       Instrument: {this.state.name}
                                  </div>
                                  <div>
                                      Docent: {this.state.teacher}
                                  </div>
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

export default Overview;
