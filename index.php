<?php

include_once "vendor/autoload.php";

$boardArray = [
    [0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0],
];

$board = new Minesweeper\Board($boardArray);
$game = new \Minesweeper\Game($board);

echo PHP_EOL;
echo "Starting new game".PHP_EOL;
echo PHP_EOL;
$game->startNewGame();
echo PHP_EOL;
Echo "Displaying square (1,1): " . PHP_EOL;
$game->revealSquare(1, 1);
echo PHP_EOL;
Echo "Displaying square (4,4): " . PHP_EOL;
$game->revealSquare(4, 4);
echo PHP_EOL;
Echo "Displaying square (2,4): " . PHP_EOL;
$game->revealSquare(2, 4);
