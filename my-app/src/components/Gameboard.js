import React, { Component } from 'react';

class Gameboard extends Component {
//losowanie tutaj
//ilosc klikniec
//ilosc statkow 
//gra z komputerem w osobnym komponencie z komponentem nadrzednym
    shipsLength = [4,3,3,2,2,2,1,1,1,1];
    state = {
        gameBoard: false,
        hitCount: 0,
        clikCount: 0
    };
    printBoard = (e) => {
        let gameBoard = [...this.state.gameBoard];
        
        // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
        if (e.target !== e.currentTarget) {
            this.setState((state) =>({clikCount:state.clikCount + 1}));
            const row = e.target.id.substring(0,1);
            const col = e.target.id.substring(1,2);
            
            if (gameBoard[row][col] === 0) {
                gameBoard[row][col] = 3;
                this.setState({
                    gameBoard
                });
            } else if (gameBoard[row][col] === 1) {
                gameBoard[row][col] = 2;
                this.setState((state) => ({
                    gameBoard,
                    hitCount:state.hitCount + 1,
                }),
                ()=>{
                    if (this.state.hitCount === 17) {
                        alert("All enemy battleships have been defeated! You win!");
                    }
                });
            } else if (this.state.gameBoard[row][col] > 1) {
                alert("Stop wasting your torpedos! You already fired at this location.");
            }		
        }
    }
    color(i,j)
    {
        if (this.state.gameBoard[i][j] === 3) {
            return '#bbb';
        } else if (this.state.gameBoard[i][j] === 2) {
            return 'red';
        } else {
            return "yellow";
        }
    }
    insertRandomShips(){
        let gameBoard = [];

        for(let i = 0; i < 10; i++){
            const array = Array(10).fill(0);
            gameBoard.push(array);
        }
        this.shipsLength.forEach(shipLength => {

            let direction = Number(Math.round((Math.random())));
            // debugger;
               if(direction === 1){
                    let cell = Number(Math.floor((Math.random() * (10-shipLength))));
                    let row = Math.floor((Math.random() * 10));

                    for(let i = 0; i < shipLength; i++){
                        gameBoard[row][cell] = 1;   
                        cell++; 
                        console.log("cell " + cell);
                        }
                        this.setState({
                            gameBoard
                        });
                } else {
                    let cell = Number(Math.floor((Math.random() * (10))));
                    let row = Math.floor((Math.random() * (10-shipLength)));
                    for(let i = 0; i < shipLength; i++){
                        gameBoard[row][cell] = 1;   
                        row++; 
                        console.log("row " + row);
                        }
                    this.setState({
                        gameBoard
                    });
                
                    console.log(direction);
                    console.log(cell);
                    console.log(shipLength+cell);
            }
            
        });
    }
    componentDidMount(){
        this.insertRandomShips();
    }
    render() {
        const style = {
            border: "1px solid red",
            width: "20px",
            height: "20px"
          };
          let generatedBoard;
          if(this.state.gameBoard){
         generatedBoard = this.state.gameBoard.map((row, i) =>
                <tr key={i}>
                    {row.map((col, j) =>{
                           return <td key={`${i}${j}`} id={`${i}${j}`} style={{
                               ...style,
                               backgroundColor: this.color(i,j)
                           }}></td>
                        }
                    )}
                </tr>
            )} else { generatedBoard = null}
            console.log(this.state.gameBoard);
   
            return <div>    
            <h1>Ilosc nie trafionych pull {17 - this.state.hitCount}</h1>
                    <table onClick={this.printBoard}>
                        <tbody>
                            {generatedBoard}
                        </tbody>
                    </table>
                    <h3>Ilosc klikniec {this.state.clikCount}</h3>
                </div>
        }
    }

export default Gameboard;