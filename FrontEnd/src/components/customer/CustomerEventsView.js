// View list of upcoming events in the order of increasing date

import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Container, Alert, InputGroup, FormControl, Button } from "react-bootstrap";
import Event from "./Event";
import backend from '../common/serverDetails';
import { getCustomerEvents, getCustomerRegisteredEvents } from '../../redux/action/eventActions'


class CustomerEventsView extends Component {
    constructor(props) {
        super(props);
        this.setState({
            search_variable: "",
            order: 'asc',
            errorFlag: false,
        });
        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.props.getCustomerEvents("", "asc");
        this.props.getCustomerRegisteredEvents(localStorage.getItem('customer_id'));

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.events) {
            var { events } = nextProps;

            if(events.noRecord){
                this.setState({
                    noRecord: events,
                    events: [],
                });
            } else {
                console.log('CustomerEventsView -> componentWillReceiveProps -> events : ', events);
                this.setState({
                    events: events,
                    activePage: 1
                });
            }
        }

        if (nextProps.registered_events) {
            var { registered_events } = nextProps;
            this.setState({
                registered_events: registered_events,
            });
        }
    }

    onSearchSubmit = (e) => {
        this.props.getCustomerEvents(this.state.search_variable, this.state.order);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
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
        if (this.state.registered_events && this.state.registered_events[0]) {
            console.log("INDEX")
            index = this.state.registered_events.findIndex(e => e.event_id === inputEvent.event_id)
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
                        name="search_input"
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

const mapStateToProps = state => ({
    events: state.eventState.customerEvents,
    registered_events: state.eventState.customerRegisteredEvents,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomerEvents: (search, order) => dispatch(getCustomerEvents(search, order)),
        getCustomerRegisteredEvents: (customer_id) => dispatch(getCustomerRegisteredEvents(customer_id))
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerEventsView);