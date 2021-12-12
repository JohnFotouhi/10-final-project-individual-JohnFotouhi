import React, { Component, Fragment, useEffect, useState } from 'react';
import { Route, IndexRoute } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import Board from './Board';
import {
  ListGroup, ListGroupItem, Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, CardText, Collapse
} from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaBomb, FaFlag, FaAsterisk } from "react-icons/fa";

function Minesweeper(props){
    const [board, setBoard] = useState([]);
    const [boardCovers, setBoardCovers] = useState(Array.apply(null, Array(480)).map(function () {return 1}));
    const [cells, setCells] = useState([]);
    const [updateToggle, setupdateToggle] = useState(false);
    const rows = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450];
    const bomb = <FaBomb style={{margin:"-5px", marginTop:"-15px"}}/>;
    const flag = <FaFlag style={{margin:"-5px", marginTop:"-15px"}}/>;
    const explosion = <FaAsterisk style={{margin:"-5px", marginTop:"-15px"}}/>
    const [firstClick, setFirstClick] = useState(true);
    const [newGame, setNewGame] = useState(true);
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        var newBoard = Array.apply(null, Array(480)).map(function () {return 0});
        var newBoardCovers = Array.apply(null, Array(480)).map(function () {return 1});
        var bombCount = 0;
        while (bombCount < 100){
            var ind = Math.floor(Math.random() * 481);
            if(newBoard[ind] !== -1){
                newBoard[ind] = -1;
                ++bombCount;
            }
        }
        for(var i = 0; i < 480; ++i){
            var adjacentBombs = 0;
            if(newBoard[i] === -1)continue;
            var adjacent = getAdjacent(i, true);
            for(var j = 0; j < adjacent.length; ++j){
                if(newBoard[adjacent[j]] === -1)++adjacentBombs;
            }
            newBoard[i] = adjacentBombs;
        }
        setBoardCovers(newBoardCovers);
        setBoard(newBoard);
        setupdateToggle(!updateToggle);
        console.log(newBoard);
    }, [newGame]);

    useEffect(() => {
        var newCells = Array.apply(null, Array(480)).map(function (x, i) {
            if(boardCovers[i] === 1){
                return(
                    <Button style={{borderRadius:"0", borderColor:"black", height:"30px", width:"30px"}} key={i} onClick={() => handleClick(i)} onContextMenu={(e) => {e.preventDefault(); toggleFlag(i)}}></Button>
                );
            }
            else if(boardCovers[i] === 2){
                return(
                    <Button style={{borderRadius:"0", borderColor:"black", height:"30px", width:"30px"}} key={i} onContextMenu={(e) => {e.preventDefault(); toggleFlag(i)}}>
                        {flag}
                    </Button>
                );
            }
            else{
                //uncovered
                return(
                    <Button variant="light" style={{borderRadius:"0", borderColor:"black", height:"30px", width:"30px", cursor:"default"}} key={i}>
                        {
                            getIcon(board[i])
                        }
                    </Button>
                );
            }
        });
        setCells(newCells);
    }, [updateToggle]);

    function getAdjacent(ind, includeDiagonals){
        var adjacentIndeces = [];
        adjacentIndeces.push(ind - 30);
        adjacentIndeces.push(ind + 30);
        if(ind % 30 !== 0){
            if(includeDiagonals)adjacentIndeces.push(ind - 31, ind + 29)
            adjacentIndeces.push(ind - 1);
        }
        if((ind + 1) % 30 !== 0){
            adjacentIndeces.push(ind + 1);
            if(includeDiagonals) adjacentIndeces.push(ind - 29, ind + 31);
        }
        adjacentIndeces = adjacentIndeces.filter(function(value, index, arr){
            return (value < 480 && value > 0);
        });
        return adjacentIndeces;
    }

    function toggleFlag(ind){
        var newBoardCovers = boardCovers;
        newBoardCovers[ind] = newBoardCovers[ind] === 2 ? 1 : 2;
        setBoardCovers(newBoardCovers);
        setupdateToggle(!updateToggle);
    }

    function getIcon(num){
        if(num === -1) return bomb;
        else if(num === -2)return explosion;
        else if(num === 0)return "";
        else return num;
    }
    
    function revealAdjacent(index){
        var newBoardCovers = boardCovers;
        newBoardCovers[index] = 0;
        var adjacent = getAdjacent(index, true);
        var adjacentNoDiagonal = getAdjacent(index, false);
        for(var i = 0; i < adjacent.length; ++i){
            if(boardCovers[adjacent[i]] === 1){
                if(board[adjacent[i]] !== 0 && board[adjacent[i]] !== -1){
                    newBoardCovers[adjacent[i]] = 0;
                }
                else if(board[adjacent[i]] === 0){
                    revealAdjacent(adjacent[i]);
                }
            }
        }
        setBoardCovers(newBoardCovers);
        setupdateToggle(!updateToggle);
    }

    function win(){
        
    }

    function handleClick(index){
        if(firstClick){
            var newBoard = board;
            var adjacent = getAdjacent(index, true);
            adjacent.push(index);
            for(var i = 0; i < adjacent.length; ++i){
                if(newBoard[adjacent[i]] === -1){
                    newBoard[adjacent[i]] = 0;
                    var bombAdjacent = getAdjacent(adjacent[i], true);
                    for(var j = 0; j < bombAdjacent.length; ++j){
                        if(newBoard[bombAdjacent[j]] !== -1 && newBoard[bombAdjacent[j]] !== 0){
                            newBoard[bombAdjacent[j]] = newBoard[bombAdjacent[j]] - 1;
                        }
                    }
                }
            }
            setBoard(newBoard);
            revealAdjacent(index);
            setFirstClick(false);
        }
        else if(board[index] === -1){
            //game over
            var newBoardCovers = boardCovers;
            for(var i = 0; i < 480; ++i){
                newBoardCovers[i] = 0;
            }
            setBoardCovers(newBoardCovers);
            setupdateToggle(!updateToggle);
            setShow(true);
        }
        else if(board[index] === 0){
            //reveal all adjacent empty spaces
            revealAdjacent(index);
        }
        else{
            //is a number
            var newBoardCovers = boardCovers;
            newBoardCovers[index] = 0;
            setBoardCovers(newBoardCovers);
            setupdateToggle(!updateToggle);
            
        }
    }

    return(
        <>
        <Navbar expand="lg" color="dark" dark style={{marginBottom: "30px"}}>
            <NavbarBrand href="/">John Fotouhi</NavbarBrand>
            <Nav className="me-auto">
            <NavLink href="/">Resume</NavLink>
            <NavLink href="/minesweeper">Minesweeper</NavLink>
            </Nav>
        </Navbar>
        <h1 style={{width:"100%", textAlign:"center"}} >Minesweeper</h1>
        <Container fluid style={{padding:"0", marginBottom:"40px", borderColor:"black", borderWidth:"1px", borderStyle:"solid", width:"902px"}}>
            {rows.map((row, rowIndex) => {
                return(
                    <Row key={rowIndex} style={{margin:"0", padding:"0"}}>
                    {cells.map((cell, index) => {
                        if(index >= row && index < row + 30)return cell
                    })}
                    </Row>
                );
            })}
        </Container>
        <Button style={{margin:"20px", marginLeft:"25%"}} onClick={() => {setFirstClick(true); setNewGame(!newGame); }}>New Game</Button>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Body>You Lost</Modal.Body>
        <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal>
        </>
    );
}

/**TODO: Remove bombs surrounding first click */

export default Minesweeper;