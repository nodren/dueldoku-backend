import { isEqual, cloneDeep } from 'lodash'

import { Board } from '../types'
import { createEmptyBoard, printBoard, getBoxCoords } from './sudoku'

const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * Lifted from a python class found in an article.
 *
 * @see https://lvngd.com/blog/generating-and-solving-sudoku-puzzles-python/
 * @see https://gist.github.com/lvngd/8c1aafc4851985bbd239bc59153f26f9
 */
export class SudokuGenerator {
	private counter: number = 0
	private path: [number, number, number][] = []
	private board: Board
	private solution: Board

	constructor(board?: Board) {
		if (board) {
			this.board = board
			this.generateSolution(this.board)
		} else {
			this.board = createEmptyBoard()
		}
	}

	public generatePuzzle(difficulty: number = 3): [Board, Board] {
		this.generateSolution(this.board)
		this.solution = cloneDeep(this.board)
		// this.printBoard('full solution')
		this.removeNumbersFromBoard(difficulty)
		this.printBoard('with removed numbers')
		return [this.board, this.solution]
	}

	private printBoard(message: string) {
		console.log(message)
		console.log(printBoard(this.board))
	}

	private numUsedInRow(board: Board, row: number, number: number) {
		return board[row].indexOf(number) > -1
	}

	private numUsedInColumn(board: Board, col: number, number: number) {
		for (const row of board) {
			if (row[col] === number) {
				return true
			}
		}
		return false
	}

	private numUsedInBox(board: Board, row: number, col: number, number: number) {
		const currentCoords = getBoxCoords(row, col)
		for (const [rowIdx, row] of board.entries()) {
			for (const [colIdx, col] of row.entries()) {
				if (isEqual(currentCoords, getBoxCoords(rowIdx, colIdx))) {
					if (col === number) {
						return true
					}
				}
			}
		}
		return false
	}

	private validLocation(board: Board, row: number, col: number, number: number) {
		if (this.numUsedInRow(board, row, number)) {
			return false
		} else if (this.numUsedInColumn(board, col, number)) {
			return false
		} else if (this.numUsedInBox(board, row, col, number)) {
			return false
		}
		return true
	}

	private findEmptySquare(board: Board) {
		for (const [row, fullRow] of board.entries()) {
			for (const [col, answer] of fullRow.entries()) {
				if (answer === 0) {
					return [row, col]
				}
			}
		}
	}

	private solvePuzzle(board: Board) {
		let row: number
		let col: number
		for (const i of Array(81).keys()) {
			row = Math.floor(i / 9)
			col = i % 9
			if (board[row][col] === 0) {
				for (const number of NUMBER_LIST) {
					if (this.validLocation(board, row, col, number)) {
						board[row][col] = number
						if (!this.findEmptySquare(board)) {
							this.counter += 1
							break
						} else {
							if (this.solvePuzzle(board)) {
								return true
							}
						}
					}
				}
				break
			}
		}
		board[row][col] = 0
		return false
	}

	private generateSolution(board: Board) {
		let row: number
		let col: number
		for (const i of Array(81).keys()) {
			row = Math.floor(i / 9)
			col = i % 9

			if (board[row][col] === 0) {
				const numberList = this.shuffle(NUMBER_LIST)
				for (const number of numberList) {
					if (this.validLocation(board, row, col, number)) {
						this.path.push([number, row, col])
						board[row][col] = number

						if (!this.findEmptySquare(board)) {
							return true
						} else if (this.generateSolution(board)) {
							return true
						}
					}
				}
				break
			}
		}
		board[row][col] = 0
		return false
	}

	private getNonEmptyTiles(board: Board) {
		const nonEmptyTiles: [number, number][] = []
		for (const [row, fullRow] of board.entries()) {
			for (const [col, answer] of fullRow.entries()) {
				if (answer !== 0) {
					nonEmptyTiles.push([row, col])
				}
			}
		}
		return this.shuffle(nonEmptyTiles)
	}

	private removeNumbersFromBoard(difficulty: number) {
		const nonEmptyTiles = this.getNonEmptyTiles(this.board)
		let nonEmptyTilesCount = nonEmptyTiles.length
		let rounds = difficulty
		while (rounds > 0 && nonEmptyTilesCount >= 17) {
			const [row, col] = nonEmptyTiles.pop()
			nonEmptyTilesCount -= 1

			const removedSquare = this.board[row][col]
			this.board[row][col] = 0

			const boardCopy = cloneDeep(this.board)

			this.counter = 0

			this.solvePuzzle(boardCopy)

			if (this.counter !== 1) {
				this.board[row][col] = removedSquare
				nonEmptyTilesCount += 1
				rounds -= 1
			}
		}
	}

	private shuffle<T>(array: T[]): T[] {
		return array
			.sort(() => Math.floor(Math.random() * 3) - 1)
			.sort(() => Math.floor(Math.random() * 3) - 1)
			.sort(() => Math.floor(Math.random() * 3) - 1)
			.sort(() => Math.floor(Math.random() * 3) - 1)
			.sort(() => Math.floor(Math.random() * 3) - 1)
			.sort(() => Math.floor(Math.random() * 3) - 1)
			.sort(() => Math.floor(Math.random() * 3) - 1)
	}
}
