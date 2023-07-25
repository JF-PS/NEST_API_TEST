import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { codeErrors } from 'src/enum/code-errors.enum';
import { errorsMessage } from 'src/utils/errors-message';

@Injectable()
class ErrorService extends GraphQLError {
  constructor(codeError: keyof typeof codeErrors, err = '') {
    const errorMessage = errorsMessage[codeError].errorMessage['en'];
    const statusCode = errorsMessage[codeError].statusCode;

    super(`${errorMessage}${err}`, {
      extensions: {
        code: codeError,
        http: { status: statusCode },
      },
    });
  }
}

export default ErrorService;
