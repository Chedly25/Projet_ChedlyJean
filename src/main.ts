import { NestFactory } from '@nestjs/core';
import { MuseeModule } from './musee.module';
import { ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(MuseeModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8080);
}
bootstrap();