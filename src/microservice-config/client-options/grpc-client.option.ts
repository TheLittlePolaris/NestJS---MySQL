import { GrpcOptions, Transport } from "@nestjs/microservices"
import { join } from "path"

export const CLIENT_NAME = 'Mail_Microservice'

export const grpcMailClientOption: (GrpcOptions & { name: string}) = {
    name: CLIENT_NAME,
    transport: Transport.GRPC,
    options: {
        url: 'localhost:5000',
        package: "micromail",
        protoPath: join(__dirname, '../../protos/mail.proto')
    }
}