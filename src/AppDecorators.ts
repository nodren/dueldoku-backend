import { createParamDecorator } from '@nestjs/common'

export const AuthUser = createParamDecorator((data, reqOrCtx) => {
	if (!reqOrCtx.user && reqOrCtx[2] && reqOrCtx[2].req) {
		return reqOrCtx[2].req.user
	}
	return reqOrCtx.user
})
