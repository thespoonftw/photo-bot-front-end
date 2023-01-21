import React, { Component } from 'react';
import './Tictactoe.css';

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return i;
        }
    }
    return null;
}

function Square(props) {
    let isHighlight = props.winIndex && (lines[props.winIndex][0] == props.i || lines[props.winIndex][1] == props.i || lines[props.winIndex][2] == props.i)
    const divStyle = isHighlight ? { color: 'red' } : {}
    return (
        <button className="square" onClick={props.onClick} style={divStyle}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                i={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winIndex={this.props.winIndex}
            />
        );
    }
  
    render() {

        const array = [0, 1, 2];
        const rows = array.map(i => {

            const columns = array.map(j => {
                <div key={j}>
                     {this.renderSquare(i * 3 + j)}
                </div>               
            });

            return (
                <div className="board-row" key={i}>
                    <ol>
                        {columns}
                    </ol>
                    {this.renderSquare(i * 3 + 0)}
                    {this.renderSquare(i * 3 + 1)}
                    {this.renderSquare(i * 3 + 2)}
                </div>
            );
        });

        return (
            <div>
                <ol>
                    {rows}
                </ol>
            </div>
        );
    }
}


export class Tictactoe extends Component {
    static displayName = Tictactoe.name;

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                x: 0,
                y: 0,                
            }],
            isXNext: true,
            stepNumber: 0,
            reverse: false,
        };
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); // thorw away future
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // creates a copy of the array instead of modifying it
        // this will allow us to save previous turns, and then go back to them, common requirement
        // immutability allows the creation of "pure components" with shouldComponentUpdate() for optimizing performance
        if (calculateWinner(squares) || squares[i]) {
            return;
        }        
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ // concat doesnt mutate the original array
                squares: squares,
                x: (i % 3) + 1,
                y: Math.floor(i / 3) + 1,
            }]),
            stepNumber: history.length,
            isXNext: !this.state.isXNext,
        });
    }

    jumpTo(step) {
        // we dont update history here, leave it is as is
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const reverseText = this.state.reverse ? "Descending" : "Ascending";
        
        const moves = history.map((step, stepNo) => {
            const index = this.state.reverse ? history.length - stepNo - 1 : stepNo;
            const desc = index ?
                'Go to move (' + history[index].x + ',' + history[index].y + ')':
                'Go to game start';
            const style = this.state.stepNumber === index ? { fontWeight: 'bold' } : {};

            return (
                // items in a list need a unique key
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)} style={style}>{desc}</button>
                </li>
            );
        });

        let status; 
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber === 9) {
            status = 'A tie!';
        } else {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winIndex={winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol reversed={this.state.reverse}>{moves}</ol>
                    <button onClick={() => this.setState({reverse: !this.state.reverse})}>{reverseText}</button>
                </div>
            </div>
        );
    };
}
