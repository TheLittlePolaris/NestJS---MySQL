import { Logger, Module } from '@nestjs/common'
import { ConfigService } from './config.service'

@Module({
	imports: [Logger],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
