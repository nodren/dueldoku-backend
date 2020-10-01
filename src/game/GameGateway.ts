import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { RedisService } from '../RedisService'
import { Board } from '../types'
import { convertBoardToString } from '../utils/sudoku'
import { calculateScore } from '../utils/utils'

@WebSocketGateway()
export class GameGateway {
	constructor(private redis: RedisService) {}

	@WebSocketServer()
	server: Server

	@SubscribeMessage('start')
	async start(@MessageBody() id: string, @ConnectedSocket() socket: Socket) {
		await this.redis.set(`scores.${id}`, '{}')
		socket.join(id, err => {
			socket.to(id).emit('joined', id)
		})
	}

	@SubscribeMessage('ready')
	async ready(
		@MessageBody()
		{ id, mode, board, solution }: { id: string; mode: string; board: Board; solution: Board },
		@ConnectedSocket() socket: Socket,
	) {
		await this.redis.set(`board.${id}`, JSON.stringify(board))
		await this.redis.set(`solution.${id}`, JSON.stringify(solution))
		await this.redis.set(`answers.${id}`, JSON.stringify({}))
		this.server.to(id).emit('ready', { mode, board, solution })
	}

	@SubscribeMessage('guess')
	async guess(
		@MessageBody()
		{ id, activeBox, number }: { id: string; activeBox: [number, number]; number: number },
		@ConnectedSocket() socket: Socket,
	) {
		const board = JSON.parse(await this.redis.get(`board.${id}`))
		const solution = JSON.parse(await this.redis.get(`solution.${id}`))
		const answers = JSON.parse(await this.redis.get(`answers.${id}`))
		const scores = JSON.parse(await this.redis.get(`scores.${id}`))
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		board[activeBox[1]][activeBox[0]] = number
		answers[`${activeBox[0]}:${activeBox[1]}`] = socket.id
		scores[socket.id] =
			(scores[socket.id] || 0) + calculateScore(board, solution, activeBox, number)
		await this.redis.set(`board.${id}`, JSON.stringify(board))
		await this.redis.set(`scores.${id}`, JSON.stringify(scores))
		await this.redis.set(`answers.${id}`, JSON.stringify(answers))
		this.server.to(id).emit('update', {
			board,
			answers,
			scores,
		})

		if (convertBoardToString(board) === convertBoardToString(solution)) {
			this.server.to(id).emit('gameover')
			return
		}
	}

	@SubscribeMessage('hint')
	async hint(
		@MessageBody()
		{ id, activeBox }: { id: string; activeBox: [number, number] },
		@ConnectedSocket() socket: Socket,
	) {
		const board = JSON.parse(await this.redis.get(`board.${id}`))
		const solution = JSON.parse(await this.redis.get(`solution.${id}`))
		const answers = JSON.parse(await this.redis.get(`answers.${id}`))
		const scores = JSON.parse(await this.redis.get(`scores.${id}`))

		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		board[activeBox[1]][activeBox[0]] = solutionSquare
		scores[socket.id] = (scores[socket.id] || 0) - 50
		await this.redis.set(`board.${id}`, JSON.stringify(board))
		await this.redis.set(`scores.${id}`, JSON.stringify(scores))
		//TODO: score logic goes here
		this.server.to(id).emit('update', {
			board,
			answers,
			scores,
		})

		if (convertBoardToString(board) === convertBoardToString(solution)) {
			this.server.to(id).emit('gameover')
			return
		}
	}

	@SubscribeMessage('erase')
	async erase(
		@MessageBody()
		{ id, activeBox }: { id: string; activeBox: [number, number] },
		@ConnectedSocket() socket: Socket,
	) {
		const board = JSON.parse(await this.redis.get(`board.${id}`))
		const solution = JSON.parse(await this.redis.get(`solution.${id}`))
		const answers = JSON.parse(await this.redis.get(`answers.${id}`))

		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]

		if (boardSquare === solutionSquare) {
			return
		}
		board[activeBox[1]][activeBox[0]] = 0

		await this.redis.set(`board.${id}`, JSON.stringify(board))
		this.server.to(id).emit('update', {
			board,
			answers,
		})
	}
}
