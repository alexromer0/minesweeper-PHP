<?php

namespace Minesweeper;

class Game
{
    protected $board;

    public function __construct(Board $board)
    {
        $this->board = $board;
    }

    public function startNewGame()
    {
        $this->board->showGameBoard();
    }

    public function revealSquare($x, $y)
    {
        $this->board->showSquareContent($x, $y);

    }

}