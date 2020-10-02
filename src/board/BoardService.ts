import { Injectable } from '@nestjs/common'

import { SudokuGenerator } from '../utils/generator'

//this definitely needs tweaking
const MODES = {
	one: [80, 0, 1],
	cheat: [75, 0, 1],
	easy: [40, 3, 1],
	medium: [25, 5, 2],
	hard: [17, 8, 3],
}

@Injectable()
export class BoardService {
	generate(mode: keyof typeof MODES) {
		const generator = new SudokuGenerator()
		const [board, solution] = generator.generatePuzzle(
			MODES[mode][0],
			MODES[mode][1],
			MODES[mode][2],
		)
		return {
			board,
			solution,
		}
	}
}
