/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { AuthRepository } from 'src/repository/auth.repository';
import { TokenService } from 'src/service/token.service';
import { SignUpInput } from '../dto/signup-input';

@Injectable()
export class AuthBusiness {
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService,
  ) {}

  async signup(signUpInput: SignUpInput) {
    const { username, password, email } = signUpInput;
    const hashedPassword = await hash(password, 10);

    const user = await this.authRepository.create(
      username,
      hashedPassword,
      email,
    );

    const { accessToken, refreshToken } = await this.tokenService.create(
      user.id,
      user.email,
    );

    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken, user };
  }
}
