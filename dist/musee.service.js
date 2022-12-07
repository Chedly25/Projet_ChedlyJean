"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuseeService = void 0;
const promises_1 = require("fs/promises");
class MuseeService {
    constructor(httpservice) {
        this.httpservice = httpservice;
        this.musees = [];
    }
    async onModuleInit() {
        await Promise.all([this.loadMuseumFromFile()]);
    }
    async loadMuseumFromFile() {
        try {
            var loaded;
            const data = await (0, promises_1.readFile)('./src/liste-et-localisation-des-musees-de-france.json', 'utf8');
            const bou = (loaded = JSON.parse(data));
            for (var i = 0; i < loaded.length; i++) {
                this.musees.push({
                    nom: loaded[i]["fields"].nom_officiel_du_musee,
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
                    latitude: loaded[i]["fields"].latitude
                });
            }
            console.log((this.musees));
            return bou;
        }
        catch (err) {
            console.log(err);
        }
    }
    getAllMuseums() {
        return this.musees.sort((museum1, museum2) => museum1.region.toLowerCase().localeCompare(museum2.region.toLowerCase()));
    }
    addMuseum(musee) {
        if (!this.musees.some((storedMuseum) => musee.nom === storedMuseum.nom)) {
            this.musees.push(musee);
        }
        return musee;
    }
    getMuseum(name) {
        const musee = this.musees.find((museum) => museum.nom === name);
        if (!musee) {
            throw new Error(`No museum with name ${name}`);
        }
        return musee;
    }
    getMuseumsIn(region) {
        return this.musees.filter((museum) => museum.region === region);
    }
    getTotalNumberOfMusees() {
        return this.musees.length;
    }
    getMuseesAppellesApres(date) {
        const dateAsDate = new Date(date);
        return this.musees.filter(musee => musee.date_appellation.getTime() >= dateAsDate.getTime());
    }
    removeMuseum(name) {
        const index = this.musees.findIndex(musee => musee.nom === name);
        this.musees.splice(index);
    }
    addOrRemoveFromFavorite(name) {
        const musee = this.musees.find((museum) => museum.nom === name);
        musee.favori = !musee.favori;
        return musee;
    }
}
exports.MuseeService = MuseeService;
//# sourceMappingURL=musee.service.js.map