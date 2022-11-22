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
            var bibou;
            const data = await (0, promises_1.readFile)('./src/liste-et-localisation-des-musees-de-france.json', 'utf8');
            const bou = (bibou = JSON.parse(data));
            for (var i = 0; i < bibou.length; i++) {
                this.musees.push({
                    nom: bibou[i]["fields"].nom_officiel_du_musee,
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
                    latitude: bibou[i]["fields"].latitude
                });
            }
            return bou;
        }
        catch (err) {
            console.log(err);
        }
    }
    getAllMuseums() {
        console.log("boubou");
        return this.musees.sort((book1, book2) => book1.region.toLowerCase().localeCompare(book2.region.toLowerCase()));
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
            throw new Error(`No book with title ${name}`);
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