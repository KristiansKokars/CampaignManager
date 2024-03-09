import pino from 'pino';

export const logger = pino({
	browser: {
		disabled: import.meta.env.PROD
	}
});
