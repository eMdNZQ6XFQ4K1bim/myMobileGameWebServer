import { Test, TestingModule } from '@nestjs/testing';
import { UserOwnItemsService } from './user-own-items.service';

describe('UserOwnItemsService', () => {
  let service: UserOwnItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOwnItemsService],
    }).compile();

    service = module.get<UserOwnItemsService>(UserOwnItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
