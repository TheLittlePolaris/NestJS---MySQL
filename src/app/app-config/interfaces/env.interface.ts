import { DotenvParseOutput } from 'dotenv/types'

export enum ENV_KEY {
	NODE_ENV = 'NODE_ENV',

	JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET',
	JWT_ACCESS_DURATION = 'JWT_ACCESS_DURATION',

	JWT_REFRESH_SECET = 'JWT_REFRESH_SECET',
	JWT_REFRESH_DURATION = 'JWT_REFRESH_DURATION',

	DB_HOST = 'GD_HOST',
	DB_PORT = 'DB_PORT',
	DB_ADMIN_USERNAME = 'DB_ADMIN_USERNAME',
	DB_ADMIN_PASSWORD = 'DB_ADMIN_PASSWORD',
	DB_NAME = 'DB_NAME',
	APP_PORT = 'APP_PORT',
	APP_NAME = 'APP_NAME',
}

export type EnvironmentKey = keyof typeof ENV_KEY

export type EnvConfig = DotenvParseOutput | { [key in EnvironmentKey]: string }
