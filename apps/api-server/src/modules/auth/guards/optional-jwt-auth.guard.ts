import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(error, user) {
		if (error) {
			throw new UnauthorizedException(error);
		}

		if (!user) {
			return null;
		}

		return user;
	}
}
