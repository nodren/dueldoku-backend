import { isEqual } from 'lodash'
import { Board } from '../types'

export function convertStringToBoard(boardStr: string): Board {
	const puzzleArr = boardStr.split('')
	const puzzle: any = []
	let i = 0
	let puzzleRow = []
	for (const square of puzzleArr) {
		puzzleRow.push(parseInt(square, 10))
		i++
		if (i > 8) {
			i = 0
			puzzle.push(puzzleRow)
			puzzleRow = []
		}
	}
	return puzzle
}

export function convertBoardToString(board: Board) {
	const boardRows = []
	for (const row of board) {
		boardRows.push(row.join(''))
	}
	return boardRows.join('')
}

export function getBoxCoords(row: number, column: number): [number, number] {
	const x = Math.floor(column / 3)
	const y = Math.floor(row / 3)
	return [x, y]
}

export const isBoxFull = (board: Board, row: number, column: number) => {
	const activeBoxCoords = getBoxCoords(row, column)
	for (const [rowNum, fullRow] of board.entries()) {
		for (const [colNum, square] of fullRow.entries()) {
			const boxCoords = getBoxCoords(rowNum, colNum)
			if (isEqual(activeBoxCoords, boxCoords) && square === 0) {
				return false
			}
		}
	}
	return true
}

export function createEmptyBoard(): Board {
	return [
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0],
	]
}

export function isCompletedBoard(board: Board) {
	for (const row of board) {
		for (const col of row) {
			if (col === 0) {
				return false
			}
		}
	}
	console.log('board is complete!')
	return true
}

export function printBoard(board: Board) {
	return `|-------+-------+-------|
| ${board[0][0]} ${board[0][1]} ${board[0][2]} | ${board[0][3]} ${board[0][4]} ${board[0][5]} | ${board[0][6]} ${board[0][7]} ${board[0][8]} |
| ${board[1][0]} ${board[1][1]} ${board[1][2]} | ${board[1][3]} ${board[1][4]} ${board[1][5]} | ${board[1][6]} ${board[1][7]} ${board[1][8]} |
| ${board[2][0]} ${board[2][1]} ${board[2][2]} | ${board[2][3]} ${board[2][4]} ${board[2][5]} | ${board[2][6]} ${board[2][7]} ${board[2][8]} |
|-------+-------+-------|
| ${board[3][0]} ${board[3][1]} ${board[3][2]} | ${board[3][3]} ${board[3][4]} ${board[3][5]} | ${board[3][6]} ${board[3][7]} ${board[3][8]} |
| ${board[4][0]} ${board[4][1]} ${board[4][2]} | ${board[4][3]} ${board[4][4]} ${board[4][5]} | ${board[4][6]} ${board[4][7]} ${board[4][8]} |
| ${board[5][0]} ${board[5][1]} ${board[5][2]} | ${board[5][3]} ${board[5][4]} ${board[5][5]} | ${board[5][6]} ${board[5][7]} ${board[5][8]} |
|-------+-------+-------|
| ${board[6][0]} ${board[6][1]} ${board[6][2]} | ${board[6][3]} ${board[6][4]} ${board[6][5]} | ${board[6][6]} ${board[6][7]} ${board[6][8]} |
| ${board[7][0]} ${board[7][1]} ${board[7][2]} | ${board[7][3]} ${board[7][4]} ${board[7][5]} | ${board[7][6]} ${board[7][7]} ${board[7][8]} |
| ${board[8][0]} ${board[8][1]} ${board[8][2]} | ${board[8][3]} ${board[8][4]} ${board[8][5]} | ${board[8][6]} ${board[8][7]} ${board[8][8]} |
|-------+-------+-------|`
}
