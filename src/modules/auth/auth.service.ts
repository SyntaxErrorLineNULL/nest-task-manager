import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from '../common/dto/signUp.dto';
import { SignInDto } from '../common/dto/signIn.dto';
import { PasswordService } from '../../application/service/password.service';
import { TokenDto } from '../common/dto/token.dto';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../../application/entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(schema: SignUpDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(schema.email);
    if (user !== undefined) {
      throw new HttpException(
        'this email is already in use',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.userService.createUser(schema);
  }

  public async signIn(schema: SignInDto): Promise<TokenDto> {
    const user = await this.userService.findByEmail(schema.email);
    const isPasswordValid = await bcrypt.compareSync(
      schema.password,
      user.passwordHash,
    );

    if (!user || !isPasswordValid) {
      throw new HttpException(
        'Password or email is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await this.generateJWTToken(user);
  }

  /**
   * @private
   * @param user
   */
  private async generateJWTToken(user: UserEntity): Promise<TokenDto> {
    const payload = {
      userId: user.id,
      userEmail: user.email,
    };
    return new TokenDto({
      expiresIn: jwtConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync(payload),
    });
  }

  public async getUser(id: string): Promise<UserEntity> {
    return this.userService.getById(id);
  }
}
