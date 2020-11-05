// View list of upcoming events in the order of increasing date

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Alert, InputGroup, FormControl, Button, DropdownButton } from "react-bootstrap";
import CustomerConnect from "./CustomerConnect";
import { getCustomers, followCustomer, getCustomersFollowing} from '../../redux/action/followActions'


class CustomerEventsView extends Component {
    

    constructor(props) {
        super(props);
        this.setState({
            errorFlag: false,
            search_input: '',
            order: 'asc',
        });
        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.props.getCustomers("", "asc");
        this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
    }

    componentDidUpdate() {
        if (this.state && this.state.customerRegisterToEvent && this.state.customerRegisterToEvent === 'REGISTERED_EVENT') {
            this.setState({
                customerRegisterToEvent: null,
            })
        }
    }

    componentDidMount() {
        this.setState({
            errorFlag: false,
            search_input: '',
            order: 'asc',
        });
        if (!this.state || !(this.state.events && this.state.noRecord)) {
            this.props.getCustomers("", "asc");
            this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.events) {
            var { events } = nextProps;

            if(events.noRecord){
                this.setState({
                    noRecord: events.noRecord,
                    events: [],
                });
            } else {
                console.log('CustomerEventsView -> componentWillReceiveProps -> events : ', events);
                this.setState({
                    events: events,
                    noRecord: false,
                });
            }
        }

        if (nextProps.registered_events) {
            var { registered_events } = nextProps;
            this.setState({
                registered_events: registered_events,
            });
        }

        if (nextProps.customerRegisterToEvent) {
            var { customerRegisterToEvent } = nextProps;
            this.setState({
                customerRegisterToEvent: customerRegisterToEvent
            });
            this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
        }
    }

    onSearchSubmit = (e) => {
        e.preventDefault();
        this.props.getCustomers(this.state.search_input, this.state.order);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    registerCustomer = (e) => {
        console.log("Event:", e);
        let customer_id = localStorage.getItem("customer_id");
        let data= {
            event_id: e.target.name,
            customer_id: customer_id,
        }
        console.log('______ Trying to register to : ', data);
        this.props.followCustomer(data);
        this.props.getCustomers(this.state.search_input, this.state.order);
        this.props.getCustomersFollowing(localStorage.getItem('customer_id'));
    }

    eventsView = (inputEvent) => {
        let index = -1;
        if (this.state.registered_events && this.state.registered_events === 'NO_EVENTS_REGISTERED') {
            console.log("No registered events, so no need to find index!");
        }
        else if (this.state.registered_events && this.state.registered_events[0]) {
            console.log("INDEX")
            index = this.state.registered_events.findIndex(e => e.event_id === inputEvent.event_id)
        }
        console.log(index)
        let returnEvent = <CustomerConnect registerYourself={this.registerCustomer} event={inputEvent} showRegister={index >= 0}/>;
        return returnEvent;
    };

    render() {
        let message = null,
            restEvent,
            eventRender = [],
            locationDropdown = null;

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
                
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Location"
                        id="input-group-dropdown-2"
                    >
                    {locationDropdown}
                    </DropdownButton>
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
    customerRegisterToEvent: state.eventState.customerRegisterToEvent, 
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomers: (search, order) => dispatch(getCustomers(search, order)),
        getCustomersFollowing: (customer_id) => dispatch(getCustomersFollowing(customer_id)),
        followCustomer:(data) => dispatch(followCustomer(data)),
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerEventsView);