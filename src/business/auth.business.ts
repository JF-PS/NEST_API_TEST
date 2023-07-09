import { User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { SignUpInput } from 'src/dto/signup-input';
import { SignInInput } from 'src/dto/signin-input';
import { SignResponse } from 'src/dto/sign-response';
import { TokenService } from 'src/service/token.service';
import { AuthRepository } from 'src/repository/auth.repository';
import { LogoutResponse } from 'src/dto/logout-response';

@Injectable()
export class AuthBusiness {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService,
  ) {}

  async signup(signUpInput: SignUpInput): Promise<SignResponse> {
    const { username, password, email } = signUpInput;
    const hashedPassword = await hash(password, 10);

    const user = await this.authRepository.create(
      username,
      hashedPassword,
      email,
    );

    return this.refreshAuthAccess(user);
  }

  async signin(signInInput: SignInInput): Promise<SignResponse> {
    const { email, password } = signInInput;
    const user = await this.authRepository.getOneByEmail(email);

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const doPasswordsMatch = await compare(password, user.hashedPassword);

    if (!doPasswordsMatch) {
      throw new ForbiddenException('Access Denied');
    }

    return this.refreshAuthAccess(user);
  }

  async getNewTokens(userId: string, rt: string): Promise<SignResponse> {
    const user = await this.authRepository.getOneById(userId);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const doRefreshTokensMatch = await compare(rt, user.hashedRefreshToken);

    if (!doRefreshTokensMatch) {
      throw new ForbiddenException('Access Denied');
    }

    return this.refreshAuthAccess(user);
  }

  async refreshAuthAccess(user: User): Promise<SignResponse> {
    const { accessToken, refreshToken } = await this.tokenService.create(
      user.id,
      user.email,
    );

    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken, user };
  }

  async logout(userId: string): Promise<LogoutResponse> {
    const loggedOut = await this.authRepository.disconnect(userId);
    return { loggedOut };
  }
}
