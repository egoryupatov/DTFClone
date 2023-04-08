import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getToken(): object {
    return { token: 'superpupertoken' };
  }
}
