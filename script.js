//constは再代入のできない変数宣言
const cells = document.querySelectorAll('.cell');//cssの要素を引っ張てくる
const restartButton = document.getElementById('restart-button');
const resultMessage = document.getElementById('result');//htmlの要素メッセージでなくエレメント
const winMessage= document.getElementById('winMessage');
const winElment = document.getElementById('winElement');

let currentPlayer = 'X';
let board = ['', '', '', 
             '', '', '', 
             '', '', ''];

let gameActive = true;
let gameWin = false;

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
            gameWin = true;
            //cells.style.display = 'none';
            //resultMessage.textContent = `${currentPlayer}'s Wins!!!`;
            //cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'gold';
            //cssに勝った見た目をclassとして追加
        }
    }
}

//セルをクリックしたときの動き
function handleCellClick(cell,index) {
    //ゲーム中でありセルがからの時
    //早期リターンif(!gameActive return)にしてgameActive条件を消す
    if(!gameActive) return
    //if(cell.classList.contains("unset"))
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].style.opacity = 1;

        cell.classList.remove("unset");
        
        //勝利者の確認
        checkWinner();
        if(gameWin == true){
            cells.forEach((cell) => {
                cell.style.display = "none";
                winMessage.textContent = `${currentPlayer}'s Wins!!!`;
                winElment.style.display = "block";
            });
            //resultMessage.textContent = `${currentPlayer}'s Wins!!!`;
        }

        if (gameActive) {
            //?の右側はtrueだった場合:の右側はfalseだった場合の処理をする
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

//リスタートボタンを押した
function restartGame() {
    cells.forEach((cell) => {
        winElment.style.display = "none";
        cell.style.display = "block";
    });
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameWin = false
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

//テンプレートリテラルは使っていこう