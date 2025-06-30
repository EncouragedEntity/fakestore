/* eslint-disable max-classes-per-file */
import { HttpError } from './types';

class HttpException<T = any, D = any> extends Error {
  type: { [key: string]: boolean };

  code?: HttpError<T, D>['code'];

  status?: HttpError<T, D>['status'];

  request?: HttpError<T, D>['request'];

  config?: HttpError<T, D>['config'];

  response?: HttpError<T, D>['response'];

  constructor(message?: string, payload?: HttpError<T, D>) {
    super(message);

    this.name = 'Http exception';

    this.code = payload?.code;

    this.response = payload?.response;

    this.status = payload?.status ?? this.response?.status;

    this.request = payload?.request ?? this.response?.request;

    this.config = payload?.config ?? this.response?.config;

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

    const validator = {
      common: new RegExp('^([A-Z]+(?:_[A-Z]+)*:\\s)', 'gm'),
      jwt: new RegExp('(?:InvalidJwtToken|INVALID_JWT_TOKEN)', 'gm'),
      timeout: new RegExp('(?:timeout of|exceeded)', 'gm'),
      network: new RegExp('(?:Network Error)', 'gm'),
    } as const;

    this.type = {
      aborted: this.code?.includes('ECONNABORTED') ?? false,
      network: validator.network.test(this.message ?? ''),
      timeout: validator.timeout.test(this.message ?? ''),
      axios: payload?.isAxiosError ?? false,
    } as const;

    if (validator.common.test(this.message ?? '')) this.message = '';

    if (validator.jwt.test(this.message ?? '')) this.message = '';
  }
}

export default HttpException;