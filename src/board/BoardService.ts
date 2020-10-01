import { Injectable } from '@nestjs/common'

import { SudokuGenerator } from '../utils/generator'

//this definitely needs tweaking
const MODES = {
	one: [80, 0],
	cheat: [75, 0],
	easy: [40, 3],
	medium: [35, 3],
	hard: [27, 5],
	expert: [17, 8],
}

@Injectable()
export class BoardService {
	generate(mode: keyof typeof MODES) {
		const generator = new SudokuGenerator()
		const [board, solution] = generator.generatePuzzle(MODES[mode][0], MODES[mode][1])
		return {
			board,
			solution,
		}
	}
}
