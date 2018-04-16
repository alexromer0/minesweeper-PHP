var divBoard = $('#board');
var game = null;
var board = null;
var flags = null;
var bombs = null;
var timer = null;
var totalSeconds = null;


$('#new-game-btn').click(function (event) {
    var x = $('#cols').val();
    var y = $('#rows').val();
    bombs = $('#bombs').val();
    board = new Board(x, y, bombs);
    game = new Game(board);
    flags = 0;
    totalSeconds = 0;
    stopTimer();
    var boardTitle = $('#board-title');
    var tHead = '<tr><th class="board-title" colspan="' + x + '"><span id="bombs-counter" class="bombs-counter">' + bombs + '</span> | <span id="seconds">00</span></th></tr>';
    boardTitle.empty();
    boardTitle.append(tHead);
    game.printBoard(game.voard.getGameBoard());
});

divBoard.on('click', 'td.board-square', function (event) {
    disableBoard();
    if (totalSeconds === 0)
        startTimer();

    var x = this.cellIndex + 1;
    var y = this.parentNode.rowIndex + 1;
    displaySquare(x, y);
    enableBoard();
});

function setFlag(element) {
    disableBoard();
    event.preventDefault();
    var x = element.cellIndex;
    var y = element.parentNode.rowIndex;
    var bombsCount = $('#bombs-counter');
    bombsCount.empty();
    if ($(element).hasClass('flag')) {
        var res = game.removeFlag(x, y);
        flags--;
    }
    else {
        var res = game.setFlag(x, y);
        flags++;
    }
    bombsCount.append(bombs - flags);
    game.printBoard(res);
    enableBoard();
}


function displaySquare(x, y) {
    var res = game.revealSquare(x, y);
    game.printBoard(res);
    if (game.voard.boom) {
        stopTimer();
        disableBoard();
    }
    if (game.win) {
        stopTimer();
        alert('You Win!!');
        disableBoard();
    }
}

function startTimer() {
    console.log('Starting timer');
    timer = setInterval(setTime, 1000);
}

function setTime() {
    ++totalSeconds;
    $('#seconds').empty();
    $('#seconds').append(totalSeconds);
}

function stopTimer() {
    console.log('Stopping timer');
    clearInterval(timer);
}

function disableBoard() {
    divBoard.find('td').addClass('locked');
}

function enableBoard() {
    divBoard.find('td').removeClass('locked');
}

/**
 * Board Class
 */
class Board {
    constructor(rows, cols, bombs = 10) {
        this.boom = false;
        if ((rows >= 5 && rows <= 15) && (cols >= 5 && cols <= 15)) {
            this._content = this._generateRandomArray(cols, rows, bombs);
            this.resBoard = this._createResBoard();
        } else {
            if (((rows * cols) / 2) <= bombs)
                throw 'The are to many bombs';
            else
                throw 'The rows and columns number must be between 5 and 10';
        }
    }

    /**
     * Generates a random array for every game, 1=Bomb, 0=Empty
     * @param cols
     * @param rows
     * @param bombs
     * @return {any[]}
     * @private
     */
    _generateRandomArray(cols, rows, bombs) {
        var arr = new Array(rows);
        var bombs_counter = 0;
        var pos = 1;
        var rand_val = 0;
        for (var i = 0; i <= rows - 1; i++) {
            arr[i] = new Array(cols);
            for (var k = 0; k <= cols - 1; k++) {
                if (bombs_counter < bombs) {
                    // Check if there ara enough squares, if not put bombs in the rest of the squares
                    if (((cols * rows) - pos) < (bombs - bombs_counter)) {
                        rand_val = 1;
                    }
                    else {
                        // Generate random bombs
                        var randFactor = (parseInt(cols) + parseInt(rows)) - parseInt(bombs) + 2;
                        var rand = Math.floor(Math.random() * randFactor);
                        rand_val = rand === 1 ? 1 : 0;
                    }
                    bombs_counter += rand_val;
                    arr[i][k] = rand_val;
                } else {
                    arr[i][k] = 0;
                }
                pos++;
            }
            // Shufle the array
            this.shuffle(arr[i]);
        }
        return arr;
    }

    /**
     * Generates the game board, transform all the 1 & 0 to '*'
     * @return {boolean}
     * @private
     */
    _createResBoard() {
        var done = false;
        var newBoard = new Array(this._content.length);
        if (typeof this._content !== 'undefined') {
            for (var row = 0; row <= this._content.length - 1; row++) {
                newBoard[row] = new Array(this._content[0].length);
                for (var column = 0; column <= this._content[row].length - 1; column++) {
                    newBoard[row][column] = '*';
                }
            }
            done = newBoard;
        }
        return done;
    }

    /**
     * Getter for the Game Board
     * @return {boolean|*}
     */
    getGameBoard() {
        if (this.resBoard) {
            return this.resBoard;
        }
    }

    showSquareContent(_x, _y) {
        // X = Height
        // Y = Width
        var x = _x - 1;
        var y = _y - 1;
        var originalContent = this.getSquare(x, y);
        if (this.isBomb(originalContent)) {
            // TODO Is a Bomb
            this._showBombs();
            this.boom = true;
        } else {
            // Count the bombs around the selected square
            var bombs_counter = this._lookForBombs(x, y);
            this.refreshResBoard(x, y, bombs_counter);
        }
        return this.resBoard;
    }

    getSquare(x, y) {
        return this._content[y][x];
    }

    isBomb(square) {
        return square == 1;
    }

    _showBombs() {
        for (var y = 0; y <= this._content.length - 1; y++) {
            for (var x = 0; x <= this._content[y].length - 1; x++) {
                if (this.isBomb(this._content[x][y]))
                    this.resBoard[x][y] = 'X';
            }
        }
    }

    _lookForBombs(x, y) {
        var counter = 0;
        for (var variable = -1; variable <= 1; variable++) {
            var validPrevY = y + variable >= 0;
            var validNextY = y + variable <= this._content.length - 1;
            if (validPrevY) {
                // Has squares above
                if (validNextY) {
                    // Has squares below
                    var tmp_row = this._content[y + variable];
                }
                else
                    break;
            }
            else {
                continue;
            }
            for (var v2 = -1; v2 <= 1; v2++) {
                var validPrevX = x + v2 >= 0;
                var validNextX = x + v2 <= tmp_row.length - 1;
                if (!(((variable + y) < 0 ? 0 : (variable + y)) === y && ((v2 + x) < 0 ? 0 : (v2 + x)) === x)) {
                    // Avoid the selected square
                    if (validPrevX) {
                        // Has squares to the left
                        if (validNextX) {
                            // Has squares to the right
                            counter += this.isBomb(tmp_row[x + v2]) ? 1 : 0;
                        }
                    }
                    else {
                        if (validNextX) {
                            // Has squares to the right
                            counter += this.isBomb(tmp_row[x + v2]) ? 1 : 0;
                        }
                    }
                }
            }
        }
        return counter;
    }

    placeFlag(x, y) {
        this.resBoard[y][x] = 'F';
    }

    deleteFlag(x, y) {
        this.resBoard[y][x] = '*';
    }

    refreshResBoard(x, y, value) {
        this.resBoard[y][x] = value;
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }
}

/**
 * Handle the game
 */
class Game {
    constructor(board) {
        this.voard = board;
        this.win = false;
    }

    /**
     * Print the board game using a given Array
     * @param arr
     */
    printBoard(arr) {
        var boardBody = $('#board-body');
        var counter = 0;
        boardBody.empty();
        $.each(arr, function (index, row) {
            var divRow = '<tr id="board-row-' + index.toString() + '" class="board-row"></tr>';
            boardBody.append(divRow);
            $.each(row, function (indx, col) {
                switch (col) {
                    case '*':
                        $('#board-row-' + index.toString()).append('<td oncontextmenu="setFlag(this)" class="board-square"></td>');
                        break;

                    case 'X':
                        $('#board-row-' + index.toString()).append('<td class="board-square square-bomb locked"></td>');
                        break;
                    case 0:
                        $('#board-row-' + index.toString()).append('<td class="board-square square-safe locked">' + col + '</td>');
                        counter++;
                        break;
                    case 'F':
                        $('#board-row-' + index.toString()).append('<td oncontextmenu="setFlag(this)" class="board-square flag"></td>');
                        break;
                    default:
                        $('#board-row-' + index.toString()).append('<td class="board-square square-safe locked">' + col + '</td>');
                        counter++;
                        break;
                }
            });
        });
        // Check if the game is finished
        if (counter === ((arr.length * arr[0].length) - bombs)) {
            this.win = true;
        }
    }

    /**
     * Show a square's content
     * @param x
     * @param y
     * @return {*}
     */
    revealSquare(x, y) {
        return this.voard.showSquareContent(x, y);
    }

    /**
     * Put a flag into the board
     * @param x
     * @param y
     * @return {*}
     */
    setFlag(x, y) {
        this.voard.placeFlag(x, y);
        return this.voard.getGameBoard();
    }

    /**
     * Remove the flag from the board
     * @param x
     * @param y
     * @return {*}
     */
    removeFlag(x, y) {
        this.voard.deleteFlag(x, y);
        return this.voard.getGameBoard();
    }
}