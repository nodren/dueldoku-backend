import { Module } from '@nestjs/common'

import { AppModule } from './AppModule'

@Module({
	imports: [AppModule],
	providers: [],
	controllers: [],
})
export class RootModule {}
