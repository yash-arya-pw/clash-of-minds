"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TroopsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const troops_service_1 = require("./troops.service");
const troops_controller_1 = require("./troops.controller");
const troop_schema_1 = require("./schemas/troop.schema");
const user_troop_mapping_schema_1 = require("./schemas/user-troop-mapping.schema");
const image_schema_1 = require("../resources/schemas/image.schema");
let TroopsModule = class TroopsModule {
};
exports.TroopsModule = TroopsModule;
exports.TroopsModule = TroopsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: troop_schema_1.Troop.name, schema: troop_schema_1.TroopSchema },
                { name: user_troop_mapping_schema_1.UserTroopMapping.name, schema: user_troop_mapping_schema_1.UserTroopMappingSchema },
                { name: image_schema_1.Image.name, schema: image_schema_1.ImageSchema },
            ]),
        ],
        controllers: [troops_controller_1.TroopsController],
        providers: [troops_service_1.TroopsService],
        exports: [mongoose_1.MongooseModule, troops_service_1.TroopsService],
    })
], TroopsModule);
//# sourceMappingURL=troops.module.js.map