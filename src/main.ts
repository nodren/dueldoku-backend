import { NestFactory } from '@nestjs/core'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { config } from 'dotenv'
config()

import { RootModule } from './RootModule'

async function bootstrap() {
	const app = await NestFactory.create(RootModule)
	app.useWebSocketAdapter(new IoAdapter(app))
	app.enableCors({
		credentials: true,
		origin: process.env.ALLOWED_ORIGINS.split(','),
	})
	// app.use(
	// 	session({
	// 		resave: true,
	// 		saveUninitialized: false,
	// 		secret: process.env.SESSION_SECRET,
	// 		cookie: {
	// 			secure: 'auto',
	// 			maxAge: 60 * 60 * 24 * 30 * 1000,
	// 		},
	// 		// store: new MongoStore({
	// 		// 	mongooseConnection: mongoose.connection,
	// 		// }),
	// 	}),
	// )
	// app.use(passport.initialize())
	// app.use(passport.session())
	await app.listen(process.env.PORT)
}
bootstrap()
