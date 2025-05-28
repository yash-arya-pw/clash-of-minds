import { User } from './user.schema';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getCurrentUser(req: any): Promise<Omit<User, 'password'>>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<import("./user.schema").UserDocument>;
}
