import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	public handleRequest(err, user, info, context: ExecutionContext) {
		const req = (this as any).getRequest(context)
		if (req.session.user) {
			return req.session.user
		}
		return super.handleRequest(err, user, info, context)
	}
}
