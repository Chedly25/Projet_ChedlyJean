import { MuseeService } from './musee.service';
import { PaginatedType, PaginationService } from './pagination.service';
import { Musee } from './Musee';
export declare class MuseeController {
    private readonly museeService;
    private readonly paginationService;
    constructor(museeService: MuseeService, paginationService: PaginationService);
    addMuseum(musee: Musee): Musee;
    getAllMuseums(region: string, page: string, size: string): Musee[] | PaginatedType<Musee>;
    getMuseum(name: string): Musee;
    getTotalNumberOfMusees(): number;
    getMuseesAppellesApres(date: string | Date): Musee[];
    addOrRemoveFromFavorite(name: string): void;
    removeMuseum(name: string): void;
}
