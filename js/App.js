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
  const [turn, setTurn] = React.useState('🍕');
  const [win, setWin] = React.useState(null);

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
  console.log(event.target);
  let idx = event.target.id;
  let newBoard = [...board];
  newBoard[idx] = turn;
  setBoard(newBoard);
  let nextTurn = turn === "🍕" ? "🌮" : "🍕";
  setTurn(nextTurn);
  let whoWon = getWinner();
  setWin(whoWon);
}

React.useEffect(() => {
  let whoWon = getWinner();
  setWin(whoWon);
}, [board]);

function handleReset() {
  setBoard(Array(9).fill(""));
  setTurn("🍕");
}

function Message() {
  let message = win === 'T' ? `It's a tie!` : win ? `${win} wins the game! 😆` : `It's ${turn}'s turn!`;
    return <h2>{message}</h2>
  }
  return (
    <div>
      <h1>Tic-React-Toe</h1>
      <Message/>
      <div className="flex-container flex-column">
      <div className="flex-container flex-wrap" id="board" onClick={handleTurn}>
        {board.map((value , idx) => {
          return (
          <div className="square" key={idx} id={idx}>
            {value}
            </div>
            );
  })}
  </div>
  <button id="reset-button" onClick={handleReset}>reset</button>
  </div>  
</div>
);
}
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root)