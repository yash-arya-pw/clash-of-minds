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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("../user/user.schema");
const resource_schema_1 = require("../resources/schemas/resource.schema");
const user_resource_mapping_schema_1 = require("../resources/schemas/user-resource-mapping.schema");
let AuthService = class AuthService {
    constructor(userModel, resourceModel, userResourceMappingModel, jwtService) {
        this.userModel = userModel;
        this.resourceModel = resourceModel;
        this.userResourceMappingModel = userResourceMappingModel;
        this.jwtService = jwtService;
    }
    async createInitialResourceMappings(userId) {
        const levelOneResources = await this.resourceModel.find({ level: 1 }).exec();
        const mappings = levelOneResources.map((resource, index) => ({
            userId: new mongoose_2.Types.ObjectId(userId),
            assetId: resource._id,
            index: [Math.floor(index / 10), index % 10],
        }));
        await this.userResourceMappingModel.insertMany(mappings);
    }
    async signup(signupDto) {
        const { email, password, ...rest } = signupDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            ...rest,
            trophies: 0,
        });
        await this.createInitialResourceMappings(user._id.toString());
        const token = this.jwtService.sign({ userId: user._id });
        return { token };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ userId: user._id });
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(resource_schema_1.Resource.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_resource_mapping_schema_1.UserResourceMapping.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map