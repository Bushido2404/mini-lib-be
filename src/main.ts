import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { HttpStatus, HttpException, ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const extractMessages = (errs: ValidationError[], parentPath = ''): string[] => {
          return errs.flatMap((err) => {
            // build full path
            const path = parentPath
              ? err.property.match(/^\d+$/) // array index?
                ? `${parentPath}[${err.property}]`
                : `${parentPath}.${err.property}`
              : err.property;

            // collect current constraints
            const constraints = Object.values(err.constraints ?? {});
            const current = constraints.map((msg) => `${path}: ${msg}`);

            // recurse into children
            const children = err.children?.length ? extractMessages(err.children, path) : [];

            return [...current, ...children];
          });
        };

        const messages = extractMessages(errors);

        return new HttpException(
          {
            success: false,
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: messages,
          },
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      },
    })
  );

  app.useStaticAssets(join(__dirname, '..', 'storages'), {
    prefix: '/storages',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
