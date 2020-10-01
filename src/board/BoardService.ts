import { Injectable } from '@nestjs/common'

import { SudokuGenerator } from '../utils/generator'

//this definitely needs tweaking
const MODES = {
	easy: 2,
	medium: 4,
	hard: 7,
	expert: 12,
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
