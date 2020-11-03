// 2. View list of people who registered for the events.
// 3. Click on name and view another’s person profile.

import React, { Component } from 'react';
import { Table, Modal, Alert, Button} from "react-bootstrap";
import backend from '../common/serverDetails';

class RestaurantEventsDetails extends Component {
    constructor(props) {
        super(props);
        this.setState({
        });
    }

    componentWillMount () {
        let event = this.props.location.state.event;
        this.setState({
            event: event,
        });
    }

    onDetailsClick = (e) => {
        this.setState({
            modalParticipantId: e.target.name,
        });
    }

    participantView = (index, participant) => {
        return <tr>
            <td>{index}</td>
            <td>{participant.cust_name}</td>
            <td><Button name={participant.cust_id} onClick={this.onDetailsClick}>View {participant.cust_name}'s Profile</Button></td>
        </tr>
    }

    handleDetailsModalClose = () => {
        this.setState({
            modalParticipantId: "",
        });
    }

    getLocaleTime = (create_time) => {
        var ts = new Date(create_time);
        console.log("Timestamp:", ts.toLocaleString);
        return ts.toLocaleString();
    }

    render() {

        let participants = [], participant, message;
        let detailsModal, modalParticipant, modalParticipantImgSrc;
        for (var i = 0; i < this.state.event.participants.length; i++) {
            if(this.state.event.participants[i]){    
                participant = this.participantView((i+1), this.state.event.participants[i]);
                participants.push(participant);
            }
        }

        let participantsTable = null;
        if(this.state && this.state.event && this.state.event.participants.length > 0) {
            participantsTable = <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Participant Profile</th>
            </tr>
          </thead>
          <tbody>
          {participants}
          </tbody>
            </Table>
        } else if (this.state && this.state.event && this.state.event.participants.length === 0) {
            message = <Alert variant="warning">No registrations yet for the event</Alert>
        }

        if (this.state && this.state.modalParticipantId) {
            modalParticipant = this.state.event.participants.find(p => p.cust_id === parseInt(this.state.modalParticipantId, 10));
            modalParticipantImgSrc = `${backend}/customers/${modalParticipant.cust_id}/images`;
            detailsModal = <Modal
                                show={true}
                                backdrop="static"
                                onHide={this.handleDetailsModalClose}
                                keyboard={false}
                                centered={true}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>{modalParticipant.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <img src={modalParticipantImgSrc} style = {{width:'29rem', height:'20rem'}} />
                                    
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{modalParticipant.cust_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{modalParticipant.cust_phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Email Id</td>
                                                <td>{modalParticipant.cust_email_id}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{modalParticipant.cust_address}</td>
                                            </tr>
                                            <tr>
                                                <td>Birth Date</td>
                                                <td>{modalParticipant.cust_dob}</td>
                                            </tr>
                                            <tr>
                                                <td>About</td>
                                                <td>{modalParticipant.cust_about}</td>
                                            </tr>
                                            <tr>
                                                <td>Yelping Since</td>
                                                <td>{this.getLocaleTime(modalParticipant.cust_join_date)}</td>
                                            </tr>
                                            <tr>
                                                <td>Blog</td>
                                                <td>{modalParticipant.cust_blog_url}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleDetailsModalClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
        }

        return (
        <div>
        <center>
            <h2>{this.state.event.name}'s Registrations</h2>
            </center>
            <br/>
            {message}
            {detailsModal}
            <div style={{marginLeft:"15rem", marginRight:"15rem"}}>
            {participantsTable}
            </div>
            <br/>
            <Button style={{marginLeft:"15rem"}} href="/r_events/view">Back to Events</Button>
            <br/><br/>
            
        </div>
        );
    }
}
      
export default RestaurantEventsDetails;