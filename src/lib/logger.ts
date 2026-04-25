import { datadogLogs } from '@datadog/browser-logs';

type LogContext = Record<string, unknown>;

interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: unknown, context?: LogContext): void;
}

const isDev = process.env.NODE_ENV !== 'production';

function serializeError(err: unknown) {
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack };
  }
  return { value: err };
}

export const logger: Logger = {
  debug(msg, ctx) {
    if (isDev) console.debug(msg, ctx ?? {});
  },
  info(msg, ctx) {
    if (isDev) console.info(msg, ctx ?? {});
    else datadogLogs.logger.info(msg, ctx);
  },
  warn(msg, ctx) {
    if (isDev) console.warn(msg, ctx ?? {});
    else datadogLogs.logger.warn(msg, ctx);
  },
  error(msg, err, ctx) {
    const fullCtx = { ...(ctx ?? {}), ...(err !== undefined ? { error: serializeError(err) } : {}) };
    if (isDev) console.error(msg, fullCtx);
    else datadogLogs.logger.error(msg, fullCtx);
  },
};
