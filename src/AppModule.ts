import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { BoardModule } from './board/BoardModule'
import { GameModule } from './game/GameModule'
import { RedisService } from './RedisService'

@Module({
	imports: [
		BoardModule,
		GameModule,
		PassportModule.register({ defaultStrategy: 'local', session: true }),
	],
	controllers: [],
	providers: [RedisService],
	exports: [RedisService],
})
export class AppModule {}
