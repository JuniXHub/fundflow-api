import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@app/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService<EnvironmentVariables>)

  const PORT = configService.get<number>('PORT')
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['PUT', 'GET', 'POST', 'PATCH'],
    credentials: true,
  }

  app.enableCors(corsOptions)

  await app.listen(PORT)
}

bootstrap()
