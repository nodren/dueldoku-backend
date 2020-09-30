import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { RedisService } from '../RedisService'

import { GameGateway } from './GameGateway'

@Module({
	imports: [PassportModule.register({ defaultStrategy: 'local', session: true })],
	providers: [GameGateway, RedisService],
})
export class GameModule {}
