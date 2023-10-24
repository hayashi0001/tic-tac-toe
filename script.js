//constは再代入のできない変数宣言
const cells = document.querySelectorAll('.cell');//cssの要素を引っ張てくる（一個目のcell）
const restartButton = document.getElementById('restart-button');
const resultMessage = document.getElementById('result');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

//勝利パターン
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

//勝者判定
function checkWinner() {
    //配列列を上から回す
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        //入力されたcellの中身はすべて同じプレイヤーかチェック
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            resultMessage.textContent = `${currentPlayer}'s Wins!!!`;
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'gold';
        }
    }
}

//セルをクリックしたときの動き
function handleCellClick(cell,index) {
    //ゲーム中でありセルがからの時
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].style.opacity = 1;

        cells[index] = cell.classList.remove("unset");
        
        //勝利者の確認
        checkWinner();

        if (gameActive) {
            //?の右側はtrueだった場合:の右側はfalseだった場合の処理をする
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

//リスタートとボタンを押した
function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    resultMessage.textContent = '';
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.style.backgroundColor = '#ccc';
        cell.style.opacity = 1;
        if(cell.classList.contains("unset") === false){
            cell.classList.add("unset");
        }
    });
}

//各セルにクリックイベントリスナーを追加
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell,index));
    //cell上にマウスカーソルがあるときの処理
    cell.addEventListener('mouseover', () => {
        if (cell.textContent === '' && gameActive) {
            cell.textContent = currentPlayer;
            cell.style.opacity = 0.6;
        }
    });
    cell.addEventListener('mouseout', () => {
        //cell.textContent === currentPlayer &&
        if (gameActive && cell.classList.contains("unset") === true) {
            cell.textContent = '';
            cell.style.opacity = 1;
        }
    });
});

restartButton.addEventListener('click', restartGame);