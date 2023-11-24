function App() {
/*----- constants -----*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], 
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ];    

  /*----- app's state (variables) -----*/
  const [board, setBoard] = React.useState(["","","","","","","","",""]);
  const [turn, setTurn] = React.useState('X');
  const [gameOver, setGameOver] = React.useState(false);
  // let win;

  function getWinner() {
    let winner = null;
    winningCombos.forEach((combo, index) => {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
    winner = board[combo[0]];
}
});
    return winner ? winner : board.includes('') ? null : 'T';
}

  function handleTurn(event) {
    if (!gameOver) {
      const idx = event.target.id;
      const newBoard = [...board];
      if (newBoard[idx] === "") {
        newBoard[idx] = turn;
        setBoard(newBoard);
        const nextTurn = turn === "X" ? "O" : "X";
        setTurn(nextTurn);
        const winner = getWinner();
        if (winner || !newBoard.includes("")) {
          setGameOver(true);
        }
      }
    }
  }

  function handleReset() {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setGameOver(false);
  }

    return (
      <div>
        <h1>Tic-React-Toe</h1>
        <h2>It's {turn}'s turn!</h2>

<div className="flex-container flex-column">
<div className="flex-container flex-wrap" id="board" onClick={handleTurn}>
  {board.map((value , idx) => {
  return (
    <div className="square" key={idx} id={idx}>
      {value}
    </div>
  )
})}
</div>

<button id="reset-button" onClick={handleReset}>reset</button>
  </div>  
</div>
);
}
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root)