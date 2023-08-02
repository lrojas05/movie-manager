import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';import { createMock } from '@golevelup/ts-jest';


describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

});
