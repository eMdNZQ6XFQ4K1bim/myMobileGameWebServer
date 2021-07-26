import { Test, TestingModule } from '@nestjs/testing';
import { UserOwnItemsController } from './user-own-items.controller';

describe('UserOwnItemsController', () => {
  let controller: UserOwnItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOwnItemsController],
    }).compile();

    controller = module.get<UserOwnItemsController>(UserOwnItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
