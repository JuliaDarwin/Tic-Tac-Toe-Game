import { useState } from "react";

function Board(){
    const [player, setPlayer] = useState("X");
    const [board, setBoard] = useState(Array(9).fill(""));
    const [winner,setWinner] = useState("Next player: ");
    const winningCombinations = [
        [0,1,2],  [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ]

    const handleWinner = (currentBoard) => {
        for(let i=0; i<winningCombinations.length; i++){
            if (currentBoard[winningCombinations[i][0]] !== "" 
                && currentBoard[winningCombinations[i][0]] === currentBoard[winningCombinations[i][1]] 
                && currentBoard[winningCombinations[i][1]] === currentBoard[winningCombinations[i][2]]){
                setWinner("Winner: "+ currentBoard[winningCombinations[i][0]]);
                return;
            } 
        }
        if(!currentBoard.includes("")){
            setWinner("It's a tie ladies and gentlemen!");
        }
    }

    const handlePlayer = (index) => {
          if(board[index] === "" && winner === "Next player: "){
            const newBoard = [...board];
            newBoard[index] = player;
            setBoard(newBoard);
            handleWinner(newBoard)
            setPlayer(player === "X" ? "O" : "X");
          }
    }

    const handleReset = () => {
        setBoard(Array(9).fill(""));
        setPlayer("X");
        setWinner("Next player: ");
    }

    return(
        <div className="game">
            <h1>Tic Tac Toe Game</h1>
            <p>{winner === "Next player: " ? `${winner} ${player}` : winner}</p>
            <div className="board">
             {board.map((square, index) => (
                 <button
                    key={index}
                    className={`square ${square === "X" ? "x" : square === "O" ? "o" : ""}`}
                    onClick={() => {handlePlayer(index)}}
                 >
                    {square}
                 </button>
             ))}
            </div>
             <button className="reset" onClick={handleReset}>Reset Game</button>
        </div>
    )
}

export default Board;