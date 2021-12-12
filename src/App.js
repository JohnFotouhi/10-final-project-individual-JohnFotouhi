import React, { Component, Fragment, useEffect, useState } from 'react';
import { Route, IndexRoute } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import {
  ListGroup, ListGroupItem, Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Collapse
} from 'reactstrap';
import ResumeItem from './ResumeItem';


function App(props) {

  const [advice, setAdvice] = useState();
  const resumeItems = [["Coursework Includes: Data Structures and Algorithms, Object Oriented Programming, Web Development, Data Science", "Army ROTC: Served as a team leader overseeing four subordinates."], ["Eagle Scout: Elected by peers for the highest leadership position in the troop.", "Class President: Increased peer tutoring enrollment by 10X."], ["Worked with Docker and Kubernetes on the Azure team."], ["Worked on a website for project managers to report safety incidents.", "Used React for the front end and ASP.NET, SQL, and C# for the back end, as well as Azure DevOps."], ["Used Python, Excel, and Salesforce to analyze and track agent activity.", "Automated agent management such that a position was able to be reduced from approximately 6 hours per day to less than one hour per day."], ["Built personal connections with callers of all backgrounds while triaging multiple calls, writing detailed reports for each one, and working with other agencies to send resources to the caller when necessary."], ["Designed an android application with a backtracking algorithm in Java to solve Sudoku puzzles, published to Google Play store."], ["Built a replica of Linked List, Hash Table, and AVL tree using Java."]];
  const explosion = <i class="glyphicon glyphicon-flag"></i>;
  const flag = <i class="glyphicon glyphicon-asterisk"></i>;
  const bomb = <i class="glyphicon glyphicon-screenshot"></i>;

  function getNewAdvice(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        var adv = JSON.parse(this.responseText);
        //console.log(this.responseText);
        //console.log(adv);
        setAdvice(adv.slip.advice);
      }
    }
    xhttp.open("GET", "https://api.adviceslip.com/advice");
    //xhttp.open("GET", "https://ghibliapi.herokuapp.com/people");
    xhttp.send();
  }

  useEffect( () => {
    getNewAdvice();
  }, []);

  return (
    <>    
    <Navbar expand="lg" color="dark" dark style={{marginBottom: "30px"}}>
    <NavbarBrand href="#home">John Fotouhi</NavbarBrand>
    <Nav className="me-auto">
      <NavLink light href="#resume">Resume</NavLink>
      <NavLink href="#home">Education</NavLink>
      <NavLink href="#home">Experience</NavLink>
      <NavLink href="#home">Projects</NavLink>
      <NavLink href="/minesweeper">Minesweeper</NavLink>
    </Nav>
    </Navbar>
    <Row div style={{position: "absolute", left:"5%", width:"95%"}}>
      <Col>
        <Card style={{ width: '35rem', margin: '10px' }}>
          <CardTitle style={{textAlign: "center", marginTop: "10px", marginBottom: "-5px", fontWeight: "Bold", textDecoration: "underline"}}>Education</CardTitle>
          <CardText style={{padding:"10px"}}>
              <ResumeItem header="Washington University in St. Louis" subHeader="Computer Science - 3.9 GPA" text={resumeItems[0]}/>
              <ResumeItem header="De Smet Jesuit High School" subHeader="4.7 GPA" text={resumeItems[1]}/>
          </CardText>
        </Card>
        <Card style={{ width: '35rem', margin: '10px' }}>
          <CardTitle style={{textAlign: "center", marginTop: "10px", marginBottom: "-5px", fontWeight: "Bold", textDecoration: "underline"}}>Experience</CardTitle>
          <CardText style={{padding:"10px"}}>
              <ResumeItem header="Microsoft" subHeader="Software Engineer Internship" text={resumeItems[2]}/>
              <ResumeItem header="Clayco" subHeader="Software Engineer Internship" text={resumeItems[3]}/>
              <ResumeItem header="The Gellman Team" subHeader="IT Internship" text={resumeItems[4]}/>
              <ResumeItem header="Provident Crisis Services" subHeader="Suicide Hotline Crisis Counselor" text={resumeItems[5]}/>
          </CardText>
        </Card>
        <Card style={{ width: '35rem', margin: '10px' }}>
          <CardTitle style={{textAlign: "center", marginTop: "10px", marginBottom: "-5px", fontWeight: "Bold", textDecoration: "underline"}}>Personal Projects</CardTitle>
          <CardText style={{padding:"10px"}}>
              <ResumeItem header="Sudoku Solver Android Application" subHeader="Personal Project" text={resumeItems[6]}/>
              <ResumeItem header="Data Structures and Algorithms Implementations" subHeader="School Project" text={resumeItems[7]}/>
          </CardText>
        </Card>
      </Col>
      <Col>
        <iframe style={{margin: '10px'}} width="560" height="315" src="https://www.youtube.com/embed/pKO9UjSeLew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <Card style={{ width: '35rem', margin: '10px'  }}>
          <CardBody>
            <CardText>{advice}</CardText>
            <Button onClick={getNewAdvice}>New Quote</Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </>
  );
}

export default App;
