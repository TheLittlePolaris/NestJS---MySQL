import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { config } from 'dotenv'
import { existsSync } from 'fs'
import { EnvConfig } from './interfaces/env.interface'

import { number, object, string } from 'joi'

@Injectable()
export class AppConfigService implements OnModuleInit {
	public envConfig: EnvConfig
	constructor() {
		const nodeEnv = process.env.NODE_ENV
		const filePath = `.env${(nodeEnv && `.${nodeEnv}`) || ``}`
		const path = existsSync(filePath) ? filePath : `.env`
		this.envConfig = config({ path }).parsed
		const { error, output } = this.envConfig

		if (error) {
			throw new Error(`Fatal: CANNOT READ CONFIG ENVIRONMENT: ${error}`)
		}
		;(async () => {
			const tested = await this.validateSchema(this.envConfig)
			if (!tested) {
				process.exit(1)
			}
			Logger.debug('Env test passed!', AppConfigService.name)
		})()
	}

	onModuleInit() {}

	public get jwtAccessSecret() {
		return this.envConfig['JWT_ACCESS_SECRET']
	}


	public get jwtAccessDuration() {
		return this.envConfig['JWT_ACCESS_DURATION']
	}

	public get jwtRefreshSecret() {
		return this.envConfig['JWT_REFRESH_SECET']
	}

	public get jwtRefreshDuration() {
		return this.envConfig['JWT_REFRESH_DURATION']
	}

	public get dbHost() {
		return this.envConfig['DB_HOST']
	}

	public get dbPort() {
		return this.envConfig['DB_PORT']
	}

	public get dbUserName() {
		return this.envConfig['DB_ADMIN_USERNAME']
	}

	public get dbPassword() {
		return this.envConfig['DB_ADMIN_PASSWORD']
	}

	public get dbName() {
		return this.envConfig['DB_NAME']
	}

	public get appPort() {
		return this.envConfig['APP_PORT'] || 12021
	}

	private async validateSchema(envOutput: { [key: string]: string }) {
		const schema = object({
			NODE_ENV: string(),

			JWT_ACCESS_SECRET: string(),
			JWT_ACCESS_DURATION: string(),

			JWT_REFRESH_SECET: string(),
			JWT_REFRESH_DURATION: string(),

			APP_PORT: number(),
			APP_NAME: string(),
			DB_HOST: string(),
			DB_PORT: [string(), number()],
			DB_ADMIN_USERNAME: string(),
			DB_ADMIN_PASSWORD: string(),
			DB_NAME: string(),
		})
		try {
			return await schema.validateAsync(envOutput)
		} catch (err) {
			Logger.error(err)
			return null
		}
	}
}
