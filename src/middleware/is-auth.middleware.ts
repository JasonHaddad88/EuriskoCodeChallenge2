import { BadRequestException, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtConfigService } from "src/config/jwtconfig.service";
import { NestMiddleware } from "@nestjs/common/interfaces/middleware";
import { Request, Response, NextFunction } from 'express';

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     }
//   }
// }


export class IsAuthMiddleware implements NestMiddleware {
    constructor(@Inject(JwtService) private jwtService: JwtService){}
    async use(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new BadRequestException('Not authorized');
        }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = this.jwtService.verify(token, {secret: 'secretkey'});
    } catch (err) {
        throw new Error('Cannot verify token.')
    }
    if(!decodedToken){
        throw new BadRequestException('Not authenticated')
    }
  req.user = decodedToken._id;
  next();
};
}
