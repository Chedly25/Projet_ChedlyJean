import { Module } from '@nestjs/common';
import { MuseeController } from './musee.controller';
import { MuseeService } from './musee.service';
import { PaginationService } from './pagination.service';
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [MuseeController],
    providers: [MuseeService, PaginationService],
})
export class MuseeModule {}