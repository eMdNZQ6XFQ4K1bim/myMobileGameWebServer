import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const canActivateTypes = this.reflector.get<string[]>(
      'authTypes',
      context.getHandler(),
    );

    if (!canActivateTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isMatchType = !!canActivateTypes.find(
      (authType) => authType === user.userType,
    );

    return isMatchType;
  }
}