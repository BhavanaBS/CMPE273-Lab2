import React, { Component } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

class Connection extends Component {
  render() {

    let showButton;
    if (this.props.showFollow) {
      console.log('Connection.js -> this.props.showFollow : ', this.props.showFollow);
      showButton = <p style={{ margin:'1rem', color:'green'}}>Following!</p>
    } else {
      console.log('Connection.js -> this.props.customer : ', this.props.customer);
      showButton = <Button style={{ margin:'1rem'}}  onClick={this.props.followUser} name={this.props.customer.customer_id}>Follow</Button>
    }
    
    let profile = <Button style={{ margin:'1rem'}}  onClick={this.props.followUser} name={this.props.customer.customer_id}>Profile</Button>

    return (
      <Card bg="light" style={{ width: "50rem", margin: "2%" }}>
        <Row>
          <Col align="left">
            <Card.Body>
              <Card.Title>{this.props.customer.name}</Card.Title>
              <Card.Text>{this.props.customer.about}</Card.Text>
              <Card.Text>{this.props.customer.city}</Card.Text>
              <Card.Text>{this.props.customer.nick_name}</Card.Text>
            </Card.Body>
          </Col>
          <Col align="right">
          <br/>
            <div>{profile}</div>
            <br/>
            <div>{showButton}</div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Connection;