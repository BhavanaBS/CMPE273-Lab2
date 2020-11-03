import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCustomerRegisteredEvents } from '../../redux/action/eventActions'
import { Container, Alert, Button } from "react-bootstrap";
import Event from "./Event";

class CustomerConnectFollowing extends Component {
    constructor(props) {
        super(props);
        this.setState({
            errorFlag: false,
        });
    }

    componentWillMount() {
        this.props.getCustomerRegisteredEvents(localStorage.getItem("customer_id"))
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
    }

    eventsView = (inputEvent) => {
        let returnEvent = <Event registerYourself={this.registerCustomer} event={inputEvent} showRegister={true}/>;
        return returnEvent;
    };
    
    render() {
        let message = null,
        restEvent,
            eventRender = [];

        if (this.state && this.state.noRecord) {
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
            <h3>Following Yelpers</h3>
            {message}
            
            {eventRender}
            <Button href="/c_events/view"> View All Yelpers List</Button>
            <br/>
            <br />
            </center>
        </Container>
        );
    }
}

const mapStateToProps = state => ({
    events: state.eventState.customerRegisteredEvents,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomerRegisteredEvents: customer_id => dispatch(getCustomerRegisteredEvents(customer_id))
    };
}
      
export default connect(mapStateToProps, mapDispatchToProps)(CustomerConnectFollowing);