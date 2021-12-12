import React, { Component, Fragment, useEffect, useState } from 'react';
import {
    ListGroup, ListGroupItem, Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap';

function Difficulty (props){
    return(
        <Card>
            <ListGroup>
                <ListGroupItem>
                    E81 CSE 131	Introduction to Computer Science
                </ListGroupItem>
                <ListGroupItem>	
                    E81 CSE 132	Introduction to Computer Engineering
                </ListGroupItem>
                <ListGroupItem>
                    E81 CSE 204A    Web Development
                </ListGroupItem>
                <ListGroupItem>
                    E81 CSE 217A	Introduction to Data Science
                </ListGroupItem>
                <ListGroupItem>
                    E81 CSE 231S	Introduction to Parallel and Concurrent Programming
                </ListGroupItem>
                <ListGroupItem>
                    E81 CSE 237S	Programming Tools and Techniques
                </ListGroupItem>
                <ListGroupItem>
                    E81 CSE 240	Logic and Discrete Mathematics
                </ListGroupItem>
                <ListGroupItem>         	
                    E81 CSE 247	Data Structures and Algorithms
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

export default Difficulty;