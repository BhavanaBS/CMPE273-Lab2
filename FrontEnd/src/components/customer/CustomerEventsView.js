// View list of upcoming events in the order of increasing date

import React, { Component } from 'react';
import axios from 'axios';
import { Container, Alert, InputGroup, FormControl, Button } from "react-bootstrap";
import Event from "./Event";
import backend from '../common/serverDetails';

class CustomerEventsView extends Component {
    constructor(props) {
        super(props);
        this.setState({
            errorFlag: false,
        });
        //this.getEvents();
        this.getRegisteredEvents();
        this.eventSearch = this.eventSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    componentDidMount() {
        this.eventSearch("");
        this.setState({
            search_variable: "",
            noRecord: false
        });
    }

    eventSearch = (search_variable) => {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get(`${backend}/events/search?search=${search_variable}`)
            .then(response => {
                if (response.data) {
                    if (! response.data[0]) {
                        this.setState({
                            noRecord: true,
                            search_variable: "",
                        });
                    }
                    else {
                        this.setState({
                            events: response.data,
                        });
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({
                        errorFlag: true,
                    });
                }
            })
    }

    onSearchSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get(`${backend}/events/search?search=${this.state.search_variable}`)
            .then(response => {
                if (response.data) {
                    if (! response.data[0]) {
                        this.setState({
                            noRecord: true,
                            search_variable: ""
                        });
                    }
                    else {
                        this.setState({
                            events: response.data,
                        });
                    }
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({
                        errorFlag: true,
                    });
                }
            })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            noRecord: false
        });
    }

    // getEvents = () => {
    //     axios.defaults.withCredentials = true;
    //     axios.get(`/events`)
    //         .then(response => {
    //             if (response.data) {
    //                 this.setState({
    //                     events: response.data,
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             if (err.response && err.response.data) {
    //                 this.setState({
    //                     errorFlag: true,
    //                 });
    //             }
    //         });
    // };

    getRegisteredEvents() {
        let cust_id = localStorage.getItem("customer_id");
        axios.defaults.withCredentials = true;
        axios.get(`${backend}/customers/${cust_id}/events`)
            .then(response => {
                if (response.data) {
                    let registered_events = response.data.map(re => re.event_id);
                    this.setState({
                        registered_events: registered_events,
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

    registerCustomer = (e) => {
        let cust_id = localStorage.getItem("customer_id");
        let event_id = e.target.name;
        let data= {
            event_id: event_id,
        }
        axios.defaults.withCredentials = true;
        axios.post(`${backend}/customers/${cust_id}/events`, data)
            .then(response => {
                if (response.status === 200) {
                    let registered_events = this.state.registered_events;
                    registered_events.push(event_id)
                    this.setState({
                        registered_events: registered_events,
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
        let index = 0;
        if (this.state.registered_events) {
            console.log("INDEX")
            index = this.state.registered_events.findIndex(e => parseInt(e) === parseInt(inputEvent.id, 10))
        }
        console.log(index)
        let returnEvent = <Event registerYourself={this.registerCustomer} event={inputEvent} showRegister={index >= 0}/>;
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

        if (this.state && this.state.noRecord) {
            message = <Alert variant="warning">No Events for the search</Alert>;
        }
        
        if (this.state && this.state.events && this.state.events.length > 0) {
            for (var i = 0; i < this.state.events.length; i++) {
                restEvent = this.eventsView(this.state.events[i]);
                eventRender.push(restEvent);
            }
        }

        return (
            <Container className="justify-content">
            <br />
            <center>
            <h3>Events</h3>
            <br />
            
            <form onSubmit={this.onSearchSubmit}>
                <InputGroup style={{ width: '50%' }} size="lg">
                    <FormControl
                        placeholder="Search Event By Name"
                        aria-label="Search Events"
                        aria-describedby="basic-addon2"
                        name="search_variable"
                        onChange={this.onChange}
                    />
                    <InputGroup.Append>
                        <Button variant="primary" type="submit">Search</Button>
                    </InputGroup.Append>
                    </InputGroup>
                </form>
            {message}

            <br />
            {eventRender}</center>
        </Container>
        );
    }
}
      
export default CustomerEventsView;