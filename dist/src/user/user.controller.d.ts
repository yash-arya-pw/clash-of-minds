import { User } from './user.schema';
export declare class UserController {
    getCurrentUser(req: any): Promise<Omit<User, 'password'>>;
}
