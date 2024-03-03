import { CacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { ExtendedRequest } from "src/modules/auth/types/request.types";

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string | undefined {
    const req = context.switchToHttp().getRequest() as ExtendedRequest;
    const { httpAdapter } = this.httpAdapterHost;

    if (req.url.includes(`/auth/discord/callback`) && req.method === 'GET') {
      return undefined; 
    }

    return httpAdapter.getRequestUrl(req);
  }
}