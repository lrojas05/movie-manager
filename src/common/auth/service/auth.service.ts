import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../../users/schema/user.schema';
import { CreateUserDto } from '../../../users/dto/createUser.dto';
import { UpdateUserDto } from '../../../users/dto/updateUser.dto';


@Injectable()
export class AuthService {
  constructor(
   @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(users: UpdateUserDto) : Promise <User>{
    const user = await this.userModel.findOne({ email: users.email });
    if (user) {
      const isMatch = await bcrypt.compare(users.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      return user;
    } throw new HttpException('User Not Found ', HttpStatus.NOT_FOUND);
  }

  generateJWT(user: UpdateUserDto) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const access_token = this.jwtService.sign(payload);
    return access_token;
}


  async validateEmail(users: CreateUserDto) : Promise <User>{

      const user = await this.userModel.findOne({ email: users.email }).exec();
      if (user === null) return user; 
      throw new HttpException('email duplicate', HttpStatus.NOT_ACCEPTABLE);
  }

  async createPassword(users: UpdateUserDto) : Promise <User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(users.password, salt);
    users.password = hashPassword;
    const user = await new this.userModel(users).save();
    return user;
  }
}
