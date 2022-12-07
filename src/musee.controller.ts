import { Controller, Get, Post, Body, Param, Query, Put, Delete } from '@nestjs/common';
import { MuseeService } from './musee.service';
import { PaginatedType, PaginationService } from './pagination.service';
import { Musee } from './Musee';
@Controller('/musees')
export class MuseeController {
    constructor(private readonly museeService: MuseeService,
                private readonly paginationService: PaginationService,) {}


    @Post()
    addMuseum(@Body() musee : Musee): Musee {
        this.museeService.addMuseum(musee);
        return musee;
    }
    @Get()
    getAllMuseums(@Query('region') region: string, @Query('page') page: string,
                  @Query('size') size: string,): Musee[] | PaginatedType<Musee>{
        if (region) {
            return this.museeService.getMuseumsIn(region);
        }
        /**return this.paginationService.paginatedData(
            this.museeService.getAllMuseums(),
            page,
            size,
        );*/
        return this.museeService.getAllMuseums()
    }

    @Get(':nom')
    getMuseum(@Param('nom')name: string): Musee {
        return this.museeService.getMuseum(name);
    }

    getTotalNumberOfMusees(): number {
        return this.museeService.getTotalNumberOfMusees();
    }

    getMuseesAppellesApres(date: string | Date): Musee[] {
        return this.museeService.getMuseesAppellesApres(date)

    }

    @Put(':nom')
    addOrRemoveFromFavorite(@Param('nom') name : string) {
        this.museeService.addOrRemoveFromFavorite(name);
    }

    removeMuseum(name : string){
        this.museeService.removeMuseum(name)
    }
}