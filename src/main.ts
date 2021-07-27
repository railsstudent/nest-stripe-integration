import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet = require('helmet')
import * as compression from 'compression'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(compression())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(morgan('dev'))
  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  await app.listen(3000)
}
bootstrap()
