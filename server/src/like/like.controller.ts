import { Controller, Get } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller({ path: '/likes' })
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  /*  @Get('all')
  async test() {
    return 'test';
  }*/
}
