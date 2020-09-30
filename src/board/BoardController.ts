import { Controller, Get, Param } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

import { BoardService } from './BoardService'

@Controller('board')
export class BoardController {
	constructor(private boardService: BoardService) {}

	@Get('generate/:mode')
	generate(@Param('mode') mode: string) {
		return this.boardService.generate(mode as any)
	}

	@Get('uuid')
	uuid() {
		return {
			id: uuid(),
		}
	}
}
