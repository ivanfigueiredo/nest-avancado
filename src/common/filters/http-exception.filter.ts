import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{

    private readonly logger = new Logger(AllExceptionsFilter.name)

    catch(exception: any, host: ArgumentsHost) {
        const Ctx = host.switchToHttp()
        const response = Ctx.getResponse()
        const request = Ctx.getRequest()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const message = exception instanceof HttpException ? exception.getResponse() : exception

        this.logger.error(`Http Status ${status} Error message: ${JSON.stringify(message)}`)

        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        })
    }

}