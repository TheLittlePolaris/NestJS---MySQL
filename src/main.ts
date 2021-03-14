import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import * as csurf from 'csurf'
import * as morgan from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { Logger, ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './exception-filters/http-exception.filter'
import { AllExceptionsFilter } from './exception-filters/all-exception.filter'
import { ConfigService } from './app/config/config.service'

async function bootstrap() {
	const BOOSTRAP_CONTEXT = 'Boostrap'
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Nestjs Example MySQL')
		.setDescription('Nestjs MySQL Example')
		.setVersion('1.0')
		.addTag('NestJS MySQL')
		.build()

	app.enableCors({ origin: '*' })
	app.use(cookieParser())
	app.use(helmet())
	app.use(morgan('tiny'))

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	await app.init()

	const { envConfig } = app.get(ConfigService)
	const port = envConfig['APP_PORT'] || 12021

	app.use(session({ secret: envConfig['AUTH_SECRET'], resave: false, saveUninitialized: false }))
	app.use(csurf())

	app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter())

	await app.listen(port)

	Logger.debug(`Listening on port ${port} 🚀!`, BOOSTRAP_CONTEXT)
}
bootstrap()
