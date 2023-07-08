import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { Auth } from '../entity/auth.entity';
import { SignUpInput } from '../dto/signup-input';
import { SignResponse } from '../dto/sign-response';
import { Public } from '../decorator/public.decorator';
import { AuthBusiness } from '../business/auth.business';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authBusiness: AuthBusiness) {}

  @Public()
  @Mutation(() => SignResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authBusiness.signup(signUpInput);
  }
}
