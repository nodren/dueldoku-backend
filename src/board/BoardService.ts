import { Injectable } from '@nestjs/common'

import { SudokuGenerator } from '../utils/generator'

//this definitely needs tweaking
const MODES = {
	easy: 1,
	medium: 3,
	hard: 5,
	expert: 10,
}

@Injectable()
export class BoardService {
	generate(mode: keyof typeof MODES) {
		const generator = new SudokuGenerator()
		const [board, solution] = generator.generatePuzzle(MODES[mode])
		return {
			board,
			solution,
		}
	}
}
