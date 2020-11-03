import React, { Component } from 'react';
import axios from 'axios';
import { Container, Alert, Button } from "react-bootstrap";
import Event from "./Event";
import backend from '../common/serverDetails';

class CustomerEventsRegistered extends Component {
    constructor(props) {
        super(props);
        this.setState({
            errorFlag: false,
        });
        this.getRegisteredEvents();
    }

    getRegisteredEvents() {
        let cust_id = localStorage.getItem("customer_id");
        axios.defaults.withCredentials = true;
        axios.get(`${backend}/customers/${cust_id}/events`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        events: response.data,
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        errorFlag: true,
                    });
                }
            });
    }

    eventsView = (inputEvent) => {
        let returnEvent = <Event registerYourself={this.registerCustomer} event={inputEvent} showRegister={true}/>;
        return returnEvent;
    };
    
    render() {
        let message = null,
        restEvent,
            eventRender = [];

        if (this.state && this.state.errorFlag) {
            message = <Alert variant="warning">Unable to Fetch Events. PLease retry in sometime</Alert>;
        }

        if (this.state && !this.state.events) {
            message = <Alert variant="warning">No Events</Alert>;
        }

        if (this.state && this.state.events && this.state.events.length === 0) {
            message = <Alert variant="warning">No Registered Events</Alert>;
        }
        
        if (this.state && this.state.events && this.state.events.length > 0) {
            for (var i = 0; i < this.state.events.length; i++) {
                restEvent = this.eventsView(this.state.events[i]);
                eventRender.push(restEvent);
            }
        }

        return (
            <Container className="justify-content">
            <center>
            <br />
            <h3>Registered Events</h3>
            {message}
            
            {eventRender}
            <Button href="/c_events/view"> View All Event List</Button>
            <br/>
            <br />
            </center>
        </Container>
        );
    }
}
      
export default CustomerEventsRegistered;