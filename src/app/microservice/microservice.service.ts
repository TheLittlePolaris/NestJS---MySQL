import { CLIENT_NAME } from '@/src/micro-service/client-options/grpc-client.option'
import {
	IEmailInput,
	IMailService,
	IEmailStatus,
} from '@/src/micro-service/interfaces/send-mail-service.interface'
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'

@Injectable()
export class MicroserviceService implements OnModuleInit {
	private mailService: IMailService

	constructor(@Inject(CLIENT_NAME) private client: ClientGrpcProxy) {}

	onModuleInit() {
		this.mailService = this.client.getService<IMailService>('MailService')
	}

	public async sendMail(data: IEmailInput): Promise<IEmailStatus> {
		Logger.debug(`Sending email to user ${data.userId}`)
		const result = await this.mailService.sendEmail(data).toPromise()
		Logger.debug('Email sent!')
		return result
	}
}
