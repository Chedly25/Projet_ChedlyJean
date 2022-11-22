import { Injectable, OnModuleInit } from '@nestjs/common';
import {Musee} from './Musee';
import { read } from "fs";
import {readFile} from "fs/promises"
import { workerData } from "worker_threads";
import { HttpService } from "@nestjs/axios";
import { Observable } from "rxjs";
import {AxiosResponse} from "axios";
import { ApiMusee } from "./ApiMusee";
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
            var bibou: Musee[]
            const data = await readFile('./src/liste-et-localisation-des-musees-de-france.json', 'utf8');
            const bou = (bibou = JSON.parse(data))

            for (var i = 0; i < bibou.length; i++) {
                this.musees.push({
                    nom : bibou[i]["fields"].nom_officiel_du_musee,
                    id: bibou[i]["fields"].identifiant_museofile,
                    url: bibou[i]["fields"].url,
                    telephone: bibou[i]["fields"].telephone,
                    date_appellation: bibou[i]["fields"].date_appellation,
                    favori: false,
                    region: bibou[i]["fields"].region_administrative,
                    departement: bibou[i]["fields"].departement,
                    adresse: bibou[i]["fields"].adresse,
                    lieu: bibou[i]["fields"].lieu,
                    longitude: bibou[i]["fields"].longitude,
                    latitude : bibou[i]["fields"].latitude})
            }
            return bou;
        } catch (err) {
            console.log(err);
        }
    }

    getAllMuseums() : Musee[] {
        console.log("boubou")
        return this.musees.sort((book1, book2) =>
            book1.region.toLowerCase().localeCompare(book2.region.toLowerCase()),
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
                throw new Error(`No book with title ${name}`);
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