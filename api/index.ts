import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  cachedServer = cachedServer ?? (await bootstrap());
  return cachedServer(event, context, callback);
};
