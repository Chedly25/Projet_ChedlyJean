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
        return this.paginationService.paginatedData(
            this.museeService.getAllMuseums(),
            page,
            size,
        );
    }

    @Get(':nom_officiel_du_musee')
    getMuseum(@Param('nom_officiel_du_musee')name: string): Musee {
        return this.museeService.getMuseum(name);
    }

    /*@Get(':region')
    getMuseumsIn(@Param('region')region: string): Musee[] {
        return this.museeService.getMuseumsIn(region)
    }**/

    getTotalNumberOfMusees(): number {
        return this.museeService.getTotalNumberOfMusees();
    }

    getMuseesAppellesApres(date: string | Date): Musee[] {
        return this.museeService.getMuseesAppellesApres(date)

    }

    @Put(':nom_officiel_du_musee')
    addOrRemoveFromFavorite(@Param('nom_officiel_du_musee') name : string) {
        this.museeService.addOrRemoveFromFavorite(name);
    }

    removeMuseum(name : string){
        this.museeService.removeMuseum(name)
    }
}