"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttackModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const attack_service_1 = require("./attack.service");
const attack_controller_1 = require("./attack.controller");
const user_schema_1 = require("../user/user.schema");
const resources_module_1 = require("../resources/resources.module");
const troops_module_1 = require("../troops/troops.module");
let AttackModule = class AttackModule {
};
exports.AttackModule = AttackModule;
exports.AttackModule = AttackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            resources_module_1.ResourcesModule,
            troops_module_1.TroopsModule,
        ],
        controllers: [attack_controller_1.AttackController],
        providers: [attack_service_1.AttackService],
        exports: [attack_service_1.AttackService],
    })
], AttackModule);
//# sourceMappingURL=attack.module.js.map