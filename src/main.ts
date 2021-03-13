import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const port = 3000

	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Nestjs Example MySQL')
		.setDescription('Nestjs MySQL Example')
		.setVersion('1.0')
		.addTag('NestJS MySQL')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe())
	app.use(helmet())

	await app.listen(port)

	console.log(`Listening on port ${port} ★!`)
}
bootstrap()
