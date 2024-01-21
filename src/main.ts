import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@app/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService<EnvironmentVariables>)

  const PORT = configService.get<number>('PORT')
  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['PUT', 'GET', 'POST', 'PATCH'],
    credentials: true,
  }

  app.use(cookieParser())
  app.enableCors(corsOptions)

  await app.listen(PORT)
}

bootstrap()
