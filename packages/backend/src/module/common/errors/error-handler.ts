import { HttpException, HttpStatus } from '@nestjs/common';

import { IErrorHandler } from '../types';

import ERROR_MESSAGES_EN from './error-message/errors.en';
import ERROR_MESSAGES_UA from './error-message/errors.ua';

export const ErrorHandler = ({
  message = 'SOMETHING_WRONG',
  code = 'BAD_REQUEST'
}: IErrorHandler) => {
  throw new HttpException(
    {
      message: {
        en: ERROR_MESSAGES_EN[message],
        ua: ERROR_MESSAGES_UA[message]
      }
    },
    HttpStatus[code]
  );
};
