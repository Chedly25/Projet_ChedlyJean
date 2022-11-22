"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaginationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
let PaginationService = PaginationService_1 = class PaginationService {
    constructor() {
        this.defaultPage = 0;
        this.defaultSize = 2;
    }
    paginatedData(data, page, size) {
        const pageAsNumber = PaginationService_1.getAsNumberOrDefault(page, this.defaultPage);
        const sizeAsNumber = PaginationService_1.getAsNumberOrDefault(size, this.defaultSize);
        const slicedData = data.slice(sizeAsNumber * pageAsNumber, sizeAsNumber * (pageAsNumber + 1));
        return {
            data: slicedData,
            page: pageAsNumber,
            total: data.length,
        };
    }
    static getAsNumberOrDefault(value, defaultValue) {
        return value ? parseInt(value.toString()) : defaultValue;
    }
};
PaginationService = PaginationService_1 = __decorate([
    (0, common_1.Injectable)()
], PaginationService);
exports.PaginationService = PaginationService;
//# sourceMappingURL=pagination.service.js.map