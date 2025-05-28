import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';
import { SignupDto, LoginDto } from './dto/auth.dto';
import { ResourceDocument } from '../resources/schemas/resource.schema';
import { UserResourceMappingDocument } from '../resources/schemas/user-resource-mapping.schema';
export declare class AuthService {
    private userModel;
    private resourceModel;
    private userResourceMappingModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, resourceModel: Model<ResourceDocument>, userResourceMappingModel: Model<UserResourceMappingDocument>, jwtService: JwtService);
    private createInitialResourceMappings;
    signup(signupDto: SignupDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}
