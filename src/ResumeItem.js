import React, { Component, Fragment, useEffect, useState } from 'react';
import {
    ListGroup, ListGroupItem, Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap';

function ResumeItem (props){
    return(
            <Card style={{margin: "10px", paddingLeft: "10px", paddingBottom:"5px", paddingTop:"5px"}}>
                <CardTitle style={{fontWeight: "bold"}}>
                    {props.header}
                </CardTitle>
                <CardSubtitle style={{color: "gray"}}>
                    {props.subHeader}
                </CardSubtitle>
                <CardText>
                    <ul>
                        {props.text.map((item) => <li>{item}</li>)}
                    </ul>
                </CardText>
            </Card>
    );
}

export default ResumeItem;  