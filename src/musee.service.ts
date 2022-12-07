import { Injectable, OnModuleInit } from '@nestjs/common';
import {Musee} from './Musee';
import { read } from "fs";
import {readFile} from "fs/promises"
import { workerData } from "worker_threads";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import {AxiosResponse} from "axios";
import { map, tap } from "rxjs";
//import { BookDto } from "./DTO/Book.dto";

export class MuseeService implements OnModuleInit {

    private musees: Musee[] = [];

    constructor(private readonly httpservice: HttpService) {
    }

    async onModuleInit(): Promise<void> {
        await Promise.all([this.loadMuseumFromFile()]);
    }

    private async loadMuseumFromFile(): Promise<void>{
        try {
            var loaded: Musee[]
            const data = await readFile('./src/liste-et-localisation-des-musees-de-france.json', 'utf8');
            const bou = (loaded = JSON.parse(data))

            for (var i = 0; i < loaded.length; i++) {
                this.musees.push({
                    nom : loaded[i]["fields"].nom_officiel_du_musee,
                    id: loaded[i]["fields"].identifiant_museofile,
                    url: loaded[i]["fields"].url,
                    telephone: loaded[i]["fields"].telephone,
                    date_appellation: loaded[i]["fields"].date_appellation,
                    favori: false,
                    region: loaded[i]["fields"].region_administrative,
                    departement: loaded[i]["fields"].departement,
                    adresse: loaded[i]["fields"].adresse,
                    lieu: loaded[i]["fields"].lieu,
                    longitude: loaded[i]["fields"].longitude,
                    latitude : loaded[i]["fields"].latitude})
            }
            console.log((this.musees))
            return bou;
        } catch (err) {
            console.log(err);
        }
    }

    getAllMuseums() : Musee[] {
        return this.musees.sort((museum1, museum2) =>
            museum1.region.toLowerCase().localeCompare(museum2.region.toLowerCase()),
        )
    }

    addMuseum(musee : Musee): Musee {
        if (!this.musees.some((storedMuseum) => musee.nom === storedMuseum.nom)) {
        this.musees.push(musee);
        }
        return musee;
    }

    getMuseum(name: string): Musee {
            const musee = this.musees.find((museum) => museum.nom === name);
            if (!musee) {
                throw new Error(`No museum with name ${name}`);
            }
            return musee;
    }

    getMuseumsIn(region: string): Musee[] {
        return this.musees.filter((museum) => museum.region === region);
    }

    getTotalNumberOfMusees(): number {
        return this.musees.length;
    }

    getMuseesAppellesApres(date: string | Date): Musee[] {
        const dateAsDate = new Date(date);

        return this.musees.filter(musee => musee.date_appellation.getTime() >= dateAsDate.getTime());
    }

    removeMuseum(name : string){
        const index = this.musees.findIndex(musee => musee.nom === name);
        this.musees.splice(index);
    }

    addOrRemoveFromFavorite(name : string) : Musee{
        const musee = this.musees.find((museum) => museum.nom === name)
        musee.favori = !musee.favori
        return musee
    }
}