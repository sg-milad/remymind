import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      console.log(request.user);
      if(request.user === undefined) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      return request.user;
    },
  );