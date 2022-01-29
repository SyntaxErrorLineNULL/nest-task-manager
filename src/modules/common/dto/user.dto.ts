/**
 * Author: SyntaxErrorLineNULL.
 */

import { ApiProperty } from '@nestjs/swagger';
import { UserStatusEnum } from '../../user/enum/user.status.enum';
import { Role } from '../../user/enum/role';

export class UserDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: 'timestamp' })
  createAt: string;

  @ApiProperty({ enum: UserStatusEnum })
  status: string;

  @ApiProperty({ enum: Role })
  role: string;

  /**
   * @param userId
   * @param name
   * @param email
   * @param createAt
   * @param status
   * @param role
   */
  public constructor(userId: string, name: string, email: string, createAt: string, status: string, role: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.createAt = createAt;
    this.status = status;
    this.role = role;
  }
}
