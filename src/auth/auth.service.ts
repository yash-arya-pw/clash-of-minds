import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/user.schema';
import { SignupDto, LoginDto } from './dto/auth.dto';
import { Resource, ResourceDocument } from '../resources/schemas/resource.schema';
import { UserResourceMapping, UserResourceMappingDocument } from '../resources/schemas/user-resource-mapping.schema';
import { TroopsService } from '../troops/troops.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
    @InjectModel(UserResourceMapping.name) private userResourceMappingModel: Model<UserResourceMappingDocument>,
    private jwtService: JwtService,
    private troopsService: TroopsService,
  ) {}

  private async createInitialResourceMappings(userId: string) {
    // Find all resources with level 1
    const levelOneResources = await this.resourceModel.find({ level: 1 }).exec();

    // Create mappings for each resource
    const mappings = levelOneResources.map((resource, index) => ({
      userId: new Types.ObjectId(userId),
      assetId: resource._id,
      index:
        resource.name === 'Study Hall'
          ? [5, 5]
          : [Math.floor(index / 10), index % 10],
    }));

    // Insert all mappings
    await this.userResourceMappingModel.insertMany(mappings);
  }

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const { email, password, ...rest } = signupDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      ...rest,
      trophies: 0,
      gold: 100,
      elixir: 100,
    });

    // Create initial resource mappings
    await this.createInitialResourceMappings(user._id.toString());

    // Create initial troop mappings
    await this.troopsService.createInitialTroopMappings(user._id.toString());

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.jwtService.sign({ userId: user._id });

    return { token };
  }
} 