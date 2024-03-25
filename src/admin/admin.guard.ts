// admin.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isAdmin = this.reflector.get<string>('isAdmin', context.getHandler());
    if (!isAdmin) {
      return true; 
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    return user && user.type === 'admin';
  }
}

