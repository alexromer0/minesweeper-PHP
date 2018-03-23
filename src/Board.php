<?php

namespace Minesweeper;

class Board
{
    protected $content;
    protected $resBoard;

    public function __construct(array $content)
    {
        $this->content = $content;
        $this->resBoard = $this->createResBoard();
    }

    private function createResBoard()
    {
        $done = false;
        $newBoard = array();
        if (isset($this->content)) {
            $this->resBoard = array();
            for ($row = 0; $row <= count($this->content)-1; $row++) {
                for ($column = 0; $column <= count($this->content[$row])-1; $column++) {
                    $newBoard[$row][$column] = '*';
                }
            }
            $done = $newBoard;
        }

        return $done;
    }

    public function showGameBoard()
    {
        if ($this->resBoard) {
            $this->displayBoard($this->resBoard);
        }
        // Nothing to show
    }

    private function displayBoard(array $arrayBoard)
    {
        foreach ($arrayBoard as $row) {
            foreach ($row as $element) {
                echo $element . ' ';
            }
            echo PHP_EOL;
        }
    }

    public function showSquareContent(int $x, int $y)
    {
        // X = Height
        // Y = Width
        $x = $x - 1;
        $y = $y - 1;
        $originalContent = $this->getSquare($x, $y);
        if ($this->isBomb($originalContent)) {
            // TODO Is a Bomb
            echo "BOOOOOM! Game Over" . PHP_EOL;
            $this->showBombs();
            $this->displayBoard($this->resBoard);
            die;
        } else {
            // Count the bombs around the selected square
            $bombs_counter = $this->lookForBombs($x, $y);
            if ($bombs_counter) {
                if ($bombs_counter == 0) {
                    // TODO: show all the neightbords saquares
                } else {
                    $this->refreshResBoard($x, $y, $bombs_counter);
                    $this->displayBoard($this->resBoard);
                }
            }
        }
    }

    private function getSquare(int $x, int $y)
    {
        return $this->content[$y][$x];
    }

    private function isBomb($square)
    {
        return $square == 1;
    }

    private function lookForBombs($x, $y)
    {
        $counter = 0;
        for ($var = -1; $var <= 1; $var++) {
            $validY = ($y + $var >= 0) && ($y + $var <= count($this->content));
            if ($validY) {
                $tmp_row = $this->content[$y + $var];
                for ($v2 = -1; $v2 <= 1; $v2++) {
                    $validX = ($x + $v2 >= 0) && ($x + $v2 <= count($tmp_row));
                    if ($validX) {
                        if (!($var == $y && $v2 == $x)) {
                            $counter += $this->isBomb($tmp_row[$x + $v2]) ? 1 : 0;
                        }
                    }
                }
            }
        }
        return $counter;
    }

    private function showBombs()
    {
        for ($y= 0; $y <=  count($this->content)-1; $y++) {
            for ($x= 0; $x <= count($this->content[$y])-1; $x++) {
                if ($this->isBomb($this->content[$y][$x]))
                    $this->resBoard[$y][$x] = 'X';
            }
        }
    }

    private function refreshResBoard(int $x, int $y, $value)
    {
        $this->resBoard[$y][$x] = $value;
    }
}