/**
 * Author: SyntaxErrorLineNULL.
 */

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpSchema } from '../common/request/signUp.schema';
import { SignInSchema } from '../common/request/signIn.schema';
import { TokenSchema } from '../common/request/token.schema';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { UserStatusEnum } from '../user/enum/user.status.enum';
import { MailService } from '../../core/mail/mail.service';
import { ConfirmationAuthenticationSchema } from '../common/request/confirmation.authentication.schema';
import { Token } from '../user/entity/token.entity';
import { UserMapper } from '../common/mapper/user.mapper';
import { UserDto } from '../common/dto/user.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userMapper: UserMapper,
  ) {}

  public async signUp(schema: SignUpSchema): Promise<UserDto> {
    console.log(schema);
    let user = await this.userService.findByEmail(schema.email);
    if (user !== undefined) {
      throw new HttpException('This email is already in use', HttpStatus.FORBIDDEN);
    }

    const token = new Token();
    token.value = Math.random().toString(36).substring(2, 9);

    user = await this.userService.create(schema, token);
    await this.mailService.send(schema.email, 'Welcome', './index', {
      name: schema.name,
      token: token.value,
    });
    return this.userMapper.mapper(user);
  }

  public async signIn(schema: SignInSchema): Promise<TokenSchema> {
    const user = await this.userService.findByEmail(schema.email);

    if (user === undefined) {
      throw new HttpException('Sorry, but no such user exists', HttpStatus.UNAUTHORIZED);
    }
    return await this.generateJWTToken(user);
  }

  public async confirmationAuthentication(schema: ConfirmationAuthenticationSchema): Promise<void> {
    await this.userService.confirmationToken(schema.token);
  }

  /**
   * @private
   * @param user
   */
  private async generateJWTToken(user: User): Promise<TokenSchema> {
    const payload = { userId: user.id };
    return new TokenSchema({
      expiresIn: jwtConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync(payload),
    });
  }

  public async validate(id: string): Promise<User> {
    const user = await this.userService.getById(id);
    if (!user || user.status !== UserStatusEnum.STATUS_ACTIVE) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
