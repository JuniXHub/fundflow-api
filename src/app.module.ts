import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ConfigModule } from '@nestjs/config'
import { AccessTokenGuard } from '@app/common'
import { APP_GUARD } from '@nestjs/core'
import * as Joi from 'joi'
import { Request, Response } from 'express'
import { AppResolver } from './app.resolver'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { WorkspaceModule } from './workspace/workspace.module'
import { RoleModule } from './role/role.module'
import { CurrencyModule } from './currency/currency.module'
import { AccountModule } from './account/account.module'
import { IconModule } from './icon/icon.module'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_NAME: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),

        DATABASE_URL: Joi.string().required(),

        PORT: Joi.number().default(3000),

        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_REDIRECT_URL: Joi.string().required(),

        CLIENT_URL: Joi.string().required(),

        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
      }),
      isGlobal: true,
      expandVariables: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
    }),

    AuthModule,

    PrismaModule,

    UserModule,

    WorkspaceModule,

    RoleModule,

    CurrencyModule,

    AccountModule,

    IconModule,

    CategoryModule,
  ],
  providers: [
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
