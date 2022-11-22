import { OnModuleInit } from '@nestjs/common';
import { Musee } from './Musee';
import { HttpService } from "@nestjs/axios";
export declare class MuseeService implements OnModuleInit {
    private readonly httpservice;
    private musees;
    constructor(httpservice: HttpService);
    onModuleInit(): Promise<void>;
    private loadMuseumFromFile;
    getAllMuseums(): Musee[];
    addMuseum(musee: Musee): Musee;
    getMuseum(name: string): Musee;
    getMuseumsIn(region: string): Musee[];
    getTotalNumberOfMusees(): number;
    getMuseesAppellesApres(date: string | Date): Musee[];
    removeMuseum(name: string): void;
    addOrRemoveFromFavorite(name: string): Musee;
}
