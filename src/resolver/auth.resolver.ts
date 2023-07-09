import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { Auth } from '../entity/auth.entity';
import { SignUpInput } from '../dto/signup-input';
import { SignInInput } from '../dto/signin-input';
import { SignResponse } from '../dto/sign-response';
import { Public } from '../decorator/public.decorator';
import { AuthBusiness } from '../business/auth.business';
import { LogoutResponse } from 'src/dto/logout-response';
import { UseGuards } from '@nestjs/common';
import { CurrentUserId } from 'src/decorator/currentUserId.decorator';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';
import { NewTokensResponse } from 'src/dto/newTokensResponse';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authBusiness: AuthBusiness) {}

  @Public()
  @Mutation(() => SignResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authBusiness.signup(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authBusiness.signin(signInInput);
  }

  @Public()
  @Mutation(() => LogoutResponse)
  logout(@Args('id', { type: () => String }) id: string) {
    return this.authBusiness.logout(id);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokensResponse)
  getNewTokens(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authBusiness.getNewTokens(userId, refreshToken);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
