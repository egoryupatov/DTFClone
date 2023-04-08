import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  /* Old */

  /*  @Get('/info/:id')
  async getLoggedUserInfo(@Param() param) {
    return this.usersService.getLoggedUserInfo(Number(param.id));
  }*/

  /* @Post('/subscribe')
  async subscribeToUser(@Body() body) {
    return this.usersService.subscribeToUser(body.userId, body.subId);
  }

  @Post('/unsubscribe')
  async unsubscribeFromUser(@Body() body) {
    return this.usersService.unsubscribeFromUser(body.userId, body.subId);
  }*/

  /*
  @Post('/hide')
  async hidePost(@Body() data) {
    await this.usersService.hidePost(data);
  }
*/

  /*  @Post('/unhide')
  async unHidePost(@Body() data) {
    await this.usersService.unHidePost(data);
  }*/
}
