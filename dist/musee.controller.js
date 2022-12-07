"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuseeController = void 0;
const common_1 = require("@nestjs/common");
const musee_service_1 = require("./musee.service");
const pagination_service_1 = require("./pagination.service");
let MuseeController = class MuseeController {
    constructor(museeService, paginationService) {
        this.museeService = museeService;
        this.paginationService = paginationService;
    }
    addMuseum(musee) {
        this.museeService.addMuseum(musee);
        return musee;
    }
    getAllMuseums(region, page, size) {
        if (region) {
            return this.museeService.getMuseumsIn(region);
        }
        return this.museeService.getAllMuseums();
    }
    getMuseum(name) {
        return this.museeService.getMuseum(name);
    }
    getTotalNumberOfMusees() {
        return this.museeService.getTotalNumberOfMusees();
    }
    getMuseesAppellesApres(date) {
        return this.museeService.getMuseesAppellesApres(date);
    }
    addOrRemoveFromFavorite(name) {
        this.museeService.addOrRemoveFromFavorite(name);
    }
    removeMuseum(name) {
        this.museeService.removeMuseum(name);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], MuseeController.prototype, "addMuseum", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('region')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Object)
], MuseeController.prototype, "getAllMuseums", null);
__decorate([
    (0, common_1.Get)(':nom'),
    __param(0, (0, common_1.Param)('nom')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], MuseeController.prototype, "getMuseum", null);
__decorate([
    (0, common_1.Put)(':nom'),
    __param(0, (0, common_1.Param)('nom')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MuseeController.prototype, "addOrRemoveFromFavorite", null);
MuseeController = __decorate([
    (0, common_1.Controller)('/musees'),
    __metadata("design:paramtypes", [musee_service_1.MuseeService,
        pagination_service_1.PaginationService])
], MuseeController);
exports.MuseeController = MuseeController;
//# sourceMappingURL=musee.controller.js.map