// View list of upcoming events in the order of increasing date

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Alert, InputGroup, FormControl, Button, Pagination } from "react-bootstrap";
import Event from "./Event";
import { getCustomerEvents, getCustomerRegisteredEvents, registerToEvent } from '../../redux/action/eventActions'


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

    componentDidMount() {
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

    registerCustomer = (evant_id) => {
        let customer_id = localStorage.getItem("customer_id");
        let data= {
            event_id: evant_id,
            customer_id: customer_id,
        }
        console.log('______ Trying to register to : ', data);
        this.props.registerToEvent(data);
        this.props.getCustomerEvents("", "asc");
        this.props.getCustomerRegisteredEvents(localStorage.getItem('customer_id'));
    }

    eventsView = (inputEvent) => {
        let index = 0;
        if (this.state.registered_events && this.state.registered_events[0]) {
            console.log("INDEX")
            index = this.state.registered_events.findIndex(e => e.event_id === inputEvent.event_id)
        }
        console.log(index)
        let returnEvent = <Event registerYourself={this.registerCustomer(inputEvent.event_id)} event={inputEvent} showRegister={index >= 0}/>;
        return returnEvent;
    };

    render() {
        let message = null,
            restEvent,
            eventRender = [];

        if (this.state && this.state.errorFlag) {
            message = <Alert variant="warning">Unable to Fetch Events. Please retry in sometime</Alert>;
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
            {eventRender}
            </center>
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
        getCustomerRegisteredEvents: (customer_id) => dispatch(getCustomerRegisteredEvents(customer_id)),
        registerToEvent:(data) => dispatch(registerToEvent(data)),
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerEventsView);