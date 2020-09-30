import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { BoardController } from './BoardController'
import { BoardService } from './BoardService'

@Module({
	controllers: [BoardController],
	imports: [PassportModule.register({ defaultStrategy: 'local', session: true })],
	providers: [BoardService],
	exports: [BoardService],
})
export class BoardModule {}
