import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { SignUpInput } from 'src/dto/signup-input';
import { SignInInput } from 'src/dto/signin-input';
import { UserEntity } from 'src/entity/user.entity';
import { SignResponse } from 'src/dto/sign-response';
import ErrorService from 'src/service/error.service';
import { codeErrors } from 'src/enum/code-errors.enum';
import { LogoutResponse } from 'src/dto/logout-response';
import { TokenService } from 'src/service/token.service';
import { AuthRepository } from 'src/repository/auth.repository';

const { USER_ALREADY_EXISTS, ACCESS_DENIED, AUTHENTICATION_DENIED } =
  codeErrors;

@Injectable()
export class AuthBusiness {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService,
  ) {}

  async signup(signUpInput: SignUpInput): Promise<SignResponse> {
    const { pseudo, password, email } = signUpInput;
    const hashedPassword = await hash(password, 10);

    const userAlreadyExist = await this.authRepository.getOneByEmail(email);
    if (userAlreadyExist) {
      throw new ErrorService(USER_ALREADY_EXISTS);
    }

    const user = await this.authRepository.create(
      pseudo,
      hashedPassword,
      email,
    );

    return this.refreshAuthAccess(user);
  }

  async signin(signInInput: SignInInput): Promise<SignResponse> {
    const { email, password } = signInInput;
    const user = await this.authRepository.getOneByEmail(email);

    if (!user) {
      throw new ErrorService(AUTHENTICATION_DENIED);
    }

    const doPasswordsMatch = await compare(password, user.hashedPassword);

    if (!doPasswordsMatch) {
      throw new ErrorService(AUTHENTICATION_DENIED);
    }

    return this.refreshAuthAccess(user);
  }

  async getNewTokens(userId: string, rt: string): Promise<SignResponse> {
    const user = await this.authRepository.getOneById(userId);
    if (!user) {
      throw new ErrorService(ACCESS_DENIED);
    }
    const doRefreshTokensMatch = await compare(rt, user.hashedRefreshToken);

    if (!doRefreshTokensMatch) {
      throw new ErrorService(ACCESS_DENIED);
    }

    return this.refreshAuthAccess(user);
  }

  async refreshAuthAccess(user: UserEntity): Promise<SignResponse> {
    const { accessToken, refreshToken } = await this.tokenService.create(
      user.id,
      user.email,
      user.profile.id,
      user.role,
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
